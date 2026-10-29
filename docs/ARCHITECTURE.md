# Cycle Control Hub (Bikeside) - System Architecture & Engineering Blueprint

This document details the software architecture, data modeling, component boundaries, asynchronous flows, and design patterns governing **Cycle Control Hub (Bikeside)**.

---

## 1. High-Level System Architecture

Cycle Control Hub is architected as a decoupled, multi-tier full-stack system consisting of a **React 18** client (Vite 8, Ant Design, Tailwind CSS, Redux Toolkit), an **Express.js TypeScript** REST API server, **Mongoose ODM**, **MongoDB Atlas**, **SSLCommerz Payment Gateway**, and **Google SMTP (Nodemailer)**.

```mermaid
graph TD
    Client["Client: React 18 (Vite 8, RTK Query, Ant Design, Tailwind)"]
    Server["API Server: Node.js / Express.js (TypeScript)"]
    DB[("MongoDB Atlas Database (Mongoose ODM)")]
    SSL["SSLCommerz Payment Gateway (Payment & IPN Validation)"]
    SMTP["Google SMTP Service (Nodemailer)"]

    Client -->|HTTPS / REST API JSON| Server
    Server -->|Mongoose Queries & Aggregations| DB
    Server -->|Payment Initialization & IPN Verification| SSL
    Server -->|Password Reset Emails| SMTP
```

---

## 2. Layered Application Architecture (Server)

The backend implements a modular, layered design pattern enforcing strict separation of concerns across each incoming request:

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant Router as Express Router (/api/v1)
    participant Auth as Auth & RBAC Middleware
    participant Validator as Zod Request Validator
    participant Controller as Express Controller
    participant Service as Business Service
    participant QueryBuilder as Mongoose QueryBuilder
    participant DB as MongoDB Database

    Client->>Router: HTTP Request (Method, Route, Headers, Body)
    Router->>Auth: Validate JWT & User Role
    Auth->>Validator: Validate Request Body / Params (Zod 4)
    Validator->>Controller: Route to Controller Handler
    Controller->>Service: Call Business Logic with Sanitized Payload
    Service->>QueryBuilder: Build Search, Filter, Sort, Paginate
    QueryBuilder->>DB: Execute Mongoose Query
    DB-->>QueryBuilder: Return Mongoose Documents
    QueryBuilder-->>Service: Hydrated Results & Pagination Metadata
    Service-->>Controller: Return Business Result
    Controller-->>Client: Standardized JSON Response (sendResponse)
```

### Layer Responsibilities

1. **Routing Layer (`src/app/routes/` & `*.route.ts`)**: Registers modular route groups under the `/api/v1` namespace.
2. **Middleware Layer (`src/app/middleware/`)**:
   - `auth.ts`: Decodes and validates JWT bearer tokens, verifies user active status, and enforces user role constraints (`admin`, `seller`, `buyer`).
   - `validateRequest.ts`: Intercepts and parses incoming request bodies against strongly typed Zod 4 validation schemas.
   - `globalErrorHandler.ts`: Catches unhandled exceptions, maps CastError, Duplicate Key (11000), and ZodError to unified HTTP response envelopes, stripping sensitive internals in production.
3. **Controller Layer (`*.controller.ts`)**:
   - Extracts request body, route parameters (`req.params`), query strings (`req.query`), and authenticated user metadata (`req.user`).
   - Enforces asynchronous safety via `catchAsync`.
   - Formats client responses via `sendResponse()`.
4. **Service Layer (`*.service.ts`)**:
   - Encapsulates domain logic, stock level validations, price calculations, loyalty discount computations, and external service calls (SSLCommerz, Nodemailer).
   - Enforces strict Object-Level Authorization (IDOR guards).
5. **Query Builder Layer (`src/app/builder/QueryBuilder.ts`)**:
   - Fluent query pipeline applying `.search()`, `.filter()`, `.sort()`, `.paginate()`, and `.fields()`.
   - Automatically sanitizes query parameters against NoSQL operator injection (stripping keys starting with `$`) and escapes regular expression metacharacters to prevent ReDoS.
6. **Data Access Layer (`*.model.ts`)**:
   - Mongoose schemas, type interfaces, pre-save hooks (e.g. bcrypt password hashing), and document relationships.

---

## 3. Database Entity Relationship Model

The MongoDB Atlas database represents relationships through ObjectId references and embedded payment metadata:

```mermaid
erDiagram
    User ||--o{ Bike : "sells"
    User ||--o{ SaleBike : "publishes sale"
    Bike ||--o{ SaleBike : "originates"
    User ||--o{ Buyer : "orders"
    SaleBike ||--o{ Buyer : "purchased in"
    User ||--o{ BikeProduct : "creates"
    User ||--o{ ServiceCategory : "provides"
    Coupon ||--o{ ServiceCategory : "discounts"
    SaleBike ||--o{ ServiceHistory : "serviced in"
    ServiceCategory ||--o{ ServiceHistory : "categorized by"
    User ||--o{ ServiceHistory : "receives / provides"
    User ||--o{ Review : "writes"
    SaleBike ||--o{ Review : "reviewed"
    BikeProduct ||--o{ Review : "reviewed"

    User {
        ObjectId _id PK
        String name
        String email UK
        String password
        String contactNumber
        String address
        String photoUrl
        String gender
        String role "admin | seller | buyer"
        String status "active | blocked"
        Boolean isDeleted
        Boolean needsPasswordChange
        Date passwordChangedAt
    }

    Bike {
        ObjectId _id PK
        ObjectId seller FK
        String name
        String image
        String description
        Number quantity
        Number price
        String releaseDate
        String brand
        String model
        String type
        String size
        String color
        String frameMaterial
        String suspensionType
        String manufacturerCountry
        Boolean isSale
        Boolean isDeleted
    }

    SaleBike {
        ObjectId _id PK
        ObjectId seller FK
        ObjectId bike FK
        String name
        String image
        Number quantity
        Number price
        String releaseDate
        String brand
        String model
        String type
        Boolean isSale
        Boolean isDeleted
    }

    Buyer {
        ObjectId _id PK
        ObjectId buyer FK
        ObjectId seller FK
        ObjectId bike FK
        String transactionId UK
        Number amount
        String status "PENDING | PAID | UNPAID"
        Object paymentGatewayData
        Date buyingDate
    }

    ServiceCategory {
        ObjectId _id PK
        String serviceName
        String description
        Number price
        ObjectId serviceProvider FK
        ObjectId coupon FK
    }

    ServiceHistory {
        ObjectId _id PK
        ObjectId bike FK
        ObjectId service FK
        Number serviceBill
        ObjectId serviceProvider FK
        ObjectId serviceReceiver FK
        String lastServicingDate
        String nextServicingDate
        Number maintenanceRecords
        String notes
        String status "pending | confirmed | denied"
        Boolean isPayed
    }

    Coupon {
        ObjectId _id PK
        String name UK
        Date expiry
        String discountType "percentage | fixed"
        Number discountAmount
        Array applicableBikeIds
        Boolean isDeleted
    }
```

---

## 4. Payment Gateway & Checkout Flow (SSLCommerz)

```mermaid
sequenceDiagram
    autonumber
    actor Buyer as Buyer (Client)
    participant Server as Cycle Server (/api/v1/payment)
    participant SSL as SSLCommerz Gateway
    participant DB as MongoDB (Buyer Collection)

    Buyer->>Server: POST /payment/init-payment/:orderId
    Server->>DB: Fetch Order, Bike, and Buyer details
    Server->>SSL: Initialize Session (Amount, Customer Info, IPN URL)
    SSL-->>Server: Return GatewayPageURL
    Server-->>Buyer: Return { paymentUrl }
    Buyer->>SSL: Complete Payment on Hosted Checkout Page
    SSL->>Server: GET /payment/ipn (Instant Payment Notification with query payload)
    Server->>SSL: Validate Payment Hash & Transaction Status
    alt Payment is VALID
        Server->>DB: Update Buyer status to "PAID" with paymentGatewayData
        Server-->>SSL: HTTP 200 OK
        SSL-->>Buyer: Redirect to /payment?status=success
    else Payment is INVALID or CANCELLED
        Server->>DB: Mark order as UNPAID
        SSL-->>Buyer: Redirect to /payment?status=fail
    end
```

---

## 5. Role-Based Access Control (RBAC) Matrix

| Resource / Endpoint | Buyer | Seller | Admin | Notes |
| :--- | :---: | :---: | :---: | :--- |
| **Auth & Profile** |
| Register & Login | ✅ | ✅ | ✅ | Public registration defaults to `buyer` |
| View My Profile | ✅ | ✅ | ✅ | Own profile only |
| Update User Profile | ✅ (Self) | ✅ (Self) | ✅ (All) | Scoped to own record unless Admin |
| Change Role / Status | ❌ | ❌ | ✅ | Admin-only security control |
| **Bike Inventory** |
| View All Bikes | ✅ | ✅ | ✅ | Public catalog browsing |
| Add / Create Bike | ❌ | ✅ | ✅ | Seller & Admin catalog creation |
| Update / Delete Bike | ❌ | ✅ (Own) | ✅ (All) | IDOR-protected; seller must own bike |
| Bulk Delete Bikes | ❌ | ✅ | ✅ | Multi-selection removal |
| **Sales & Ordering** |
| Purchase Bike | ✅ | ✅ | ✅ | Instant quantity decrement |
| Cancel Purchase | ✅ (Own) | ❌ | ✅ (All) | IDOR-protected; auto-restocks stock |
| Sales Reports (Daily/Weekly) | ❌ | ✅ | ✅ | Recharts analytical views |
| **Servicing & Maintenance** |
| Request Service | ✅ | ❌ | ❌ | Buyer initiates service ticket |
| Confirm / Deny Service | ❌ | ✅ | ✅ | Service provider confirms ticket |
| Apply Coupon / Loyalty | ✅ | ❌ | ❌ | 5% per maintenance (max 50%) |
| Mark Service Paid | ✅ | ❌ | ❌ | Buyer payment settlement |
| **Coupons & Management** |
| Create / Update Coupon | ❌ | ❌ | ✅ | Admin promotional management |
| Delete Coupon | ❌ | ❌ | ✅ | Soft-deletion (`isDeleted: true`) |
