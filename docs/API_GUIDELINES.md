# Cycle Control Hub (Bikeside) - API Design Guidelines & Route Specification

This document defines the RESTful API conventions, request/response payload contracts, error handling schemas, HTTP status codes, query filtering, and comprehensive route specifications for the **Cycle Control Hub (Bikeside)** backend.

---

## 1. Base URL & API Versioning

All API endpoints follow semantic versioning prefixed under `/api/v1`:

```http
https://api.yourdomain.com/api/v1/<resource>
```

Local development base URL:
```http
http://localhost:5000/api/v1
```

All requests requiring authentication must include the JWT bearer token in the `Authorization` header:
```http
Authorization: <JWT_ACCESS_TOKEN>
```

---

## 2. Standardized Response Envelope

All API endpoints return JSON payloads enveloped consistently via the `sendResponse` utility:

### List / Paginated Response:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Bikes retrieved successfully!",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPage": 5
  },
  "data": [
    {
      "_id": "65cb76e271a39f00123abc45",
      "name": "Trek Domane SL 6",
      "image": "https://i.ibb.co/example/trek.jpg",
      "description": "Endurance road bike with front and rear IsoSpeed.",
      "quantity": 8,
      "price": 3499,
      "brand": "Trek",
      "model": "Domane SL 6",
      "type": "Road",
      "size": "56cm",
      "color": "Matte Black",
      "frameMaterial": "Carbon",
      "suspensionType": "Rigid",
      "manufacturerCountry": "USA",
      "isSale": false,
      "isDeleted": false,
      "createdAt": "2026-03-01T12:00:00.000Z",
      "updatedAt": "2026-03-01T12:00:00.000Z"
    }
  ]
}
```

### Single Entity Response:
```json
{
  "statusCode": 201,
  "success": true,
  "message": "Bike created successfully!",
  "data": {
    "_id": "65cb76e271a39f00123abc45",
    "name": "Trek Domane SL 6",
    "price": 3499
  }
}
```

### Error Response Envelope:
```json
{
  "success": false,
  "message": "Validation error",
  "errorSources": [
    {
      "path": "price",
      "message": "Bike price is required!"
    }
  ],
  "stack": null
}
```
*(Note: Internal error stack traces are stripped when `NODE_ENV=production`.)*

---

## 3. Query Parameter Filtering, Search & Pagination

Endpoints utilizing `QueryBuilder` accept standard query parameters:

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `searchTerm` | `string` | Full-text partial match across configured searchable fields (`name`, `brand`, `model`, `type`, `color`) | `?searchTerm=trek` |
| `sort` | `string` | Comma-separated sort keys (prefix with `-` for descending) | `?sort=-price,createdAt` |
| `page` | `number` | Page index (1-based, default: `1`) | `?page=2` |
| `limit` | `number` | Items per page (default: `10`) | `?limit=15` |
| `fields` | `string` | Projection fields to include/exclude | `?fields=name,price,brand` |
| `<field>` | `string` | Exact match filter (e.g. `brand`, `type`, `color`) | `?brand=Trek&color=Black` |

---

## 4. Route Specifications by Module

### 🔐 4.1 Authentication (`/api/v1/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/auth/login` | Public | Authenticate user; returns JWT `accessToken` and sets `refreshToken` |
| `POST` | `/auth/refresh-token` | Public | Exchange valid refresh token for a new access token |
| `POST` | `/auth/change-password`| Authenticated | Change user password (requires `oldPassword` & `newPassword`) |
| `POST` | `/auth/forget-password`| Public | Generate 10-minute reset link and dispatch password recovery email |
| `POST` | `/auth/reset-password` | Public | Reset password using verified reset token |

---

### 👤 4.2 User Management (`/api/v1/user`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/user/register` | Public | Register a new user account (defaults to `buyer`) |
| `GET` | `/user/my-profile` | Authenticated | Retrieve profile details of currently logged-in user |
| `GET` | `/user/users` | Admin, Seller, Buyer | Paginated list of users |
| `PUT` | `/user/update-user/:id`| Owner / Admin | Update profile info (IDOR protected; whitelisted fields only) |
| `PATCH`| `/user/change-role` | Admin | Change user role (`admin`, `seller`, `buyer`) |
| `PATCH`| `/user/change-status` | Admin | Update account status (`active`, `blocked`) |
| `PATCH`| `/user/soft-delete` | Admin | Toggle non-destructive soft-deletion flag |
| `DELETE`| `/user/delete-user/:id`| Admin | Permanently delete user record |

---

### 🚲 4.3 Bike Inventory Management (`/api/v1/bike`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/bike/create-bike` | Seller, Admin | Create a new bicycle inventory entry |
| `GET` | `/bike/get-all-bikes` | Public | Browse all available bikes with query filtering |
| `GET` | `/bike/seller-bikes` | Seller, Admin | View bikes listed specifically by the authenticated seller |
| `GET` | `/bike/:id` | Public | Retrieve detailed specifications of a single bicycle |
| `PUT` | `/bike/update-bike/:id`| Owner / Admin | Update bike specifications (IDOR protected) |
| `DELETE`| `/bike/delete-bike/:id`| Owner / Admin | Soft-delete a bike listing (IDOR protected) |
| `POST` | `/bike/bulk-delete` | Seller, Admin | Bulk delete multiple bikes by array of ObjectIds |
| `POST` | `/bike/create-sale-bike`| Seller, Admin | Publish bike for sale with assigned stock quantity |
| `GET` | `/bike/get-all-sale-bikes`| Public | Browse all bikes published for sale |

---

### 🛍️ 4.4 Buyer Orders & Sales (`/api/v1/buyer`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/buyer/purchase-bike` | Buyer, Seller, Admin | Purchase bike; generates unique `transactionId` and deducts stock |
| `GET` | `/buyer/purchase-bike` | Authenticated | Retrieve purchases made by the current buyer |
| `GET` | `/buyer/all-purchase-bike` | Seller, Admin | View all platform sales transactions |
| `PUT` | `/buyer/confirm-purchase/:id`| Owner / Admin | Confirm purchase state and mark as `PAID` |
| `DELETE`| `/buyer/cancel-purchase/:id`| Owner / Admin | Cancel order, delete record, and increment bike stock (IDOR protected) |
| `GET` | `/buyer/daily-sales` | Seller, Admin | Daily sales volume and revenue analytical data |
| `GET` | `/buyer/weekly-sales` | Seller, Admin | Weekly sales aggregation |
| `GET` | `/buyer/monthly-sales` | Seller, Admin | Monthly sales aggregation |
| `GET` | `/buyer/yearly-sales` | Seller, Admin | Yearly sales aggregation |

---

### 🔧 4.5 Bike Servicing & Maintenance (`/api/v1/service`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/service/request-service` | Buyer | Request repair or maintenance service for a purchased bike |
| `GET` | `/service/all-services` | Admin | View global servicing queue across all providers |
| `GET` | `/service/all-my-services` | Authenticated | View services requested or provided by the caller |
| `GET` | `/service/:id` | Authenticated | Get full service ticket details |
| `PATCH`| `/service/confirm-service/:id`| Provider / Admin | Confirm pending service appointment (`status: "confirmed"`) |
| `PATCH`| `/service/cancel-service/:id` | Provider / Admin | Deny or cancel service appointment (`status: "denied"`) |
| `PATCH`| `/service/apply-coupon/:id` | Buyer | Apply coupon discount and accumulated maintenance loyalty rebate |
| `PATCH`| `/service/payment-service/:id`| Buyer | Mark service fee as paid; increments `maintenanceRecords` count |
| `PUT` | `/service/update-service/:id` | Owner / Admin | Update service ticket details (IDOR protected) |
| `DELETE`| `/service/delete-service/:id` | Owner / Admin | Delete service record (IDOR protected) |

---

### 🏷️ 4.6 Service Categories & Coupons (`/api/v1/service-category` & `/api/v1/coupon`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/service-category/create-service-category`| Seller, Admin | Define a new service category (e.g. Tune-Up, Brake Overhaul) |
| `GET` | `/service-category` | Public | List all available service categories |
| `POST` | `/coupon/create-coupon` | Admin | Create discount coupon code (percentage or fixed amount) |
| `GET` | `/coupon/all-coupons` | Authenticated | Retrieve active non-deleted coupons (`isDeleted: { $ne: true }`) |
| `PUT` | `/coupon/:id` | Admin | Update coupon expiry or discount parameters |
| `DELETE`| `/coupon/:id` | Admin | Soft-delete a coupon |

---

### 💳 4.7 Payment Processing (`/api/v1/payment`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/payment/init-payment/:paymentId`| Authenticated | Initialize SSLCommerz payment session for order; returns `paymentUrl` |
| `GET` | `/payment/ipn` | Public | Instant Payment Notification webhook called by SSLCommerz validator |

---

### 📊 4.8 Executive Metrics (`/api/v1/meta`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/meta` | Admin, Seller | Executive analytical summary (total revenue, inventory, users, sales) |
