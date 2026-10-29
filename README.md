<div align="center">

# 🚲 Cycle Control Hub (Bikeside)

**Enterprise-Grade Bike Inventory, Sales & Servicing Management Platform**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK%20Query-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![SSLCommerz](https://img.shields.io/badge/Payment-SSLCommerz-006699?logo=buffer)](https://sslcommerz.com/)
[![Security Audit](https://img.shields.io/badge/npm%20audit-0%20vulnerabilities-brightgreen?logo=shield)](https://github.com/emonhassan83/cycle-control-hub-frontend)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Cycle Control Hub is a full-featured, secure multi-role web platform designed for bicycle dealerships, independent sellers, and bike service centers. Featuring comprehensive role-based access control (Admin, Seller, Buyer), inventory variant tracking, bulk operations, sales analytics, servicing lifecycle with loyalty discounts, coupons, and secure SSLCommerz payment processing.

[Explore Architecture](docs/ARCHITECTURE.md) · [API Documentation](docs/API_GUIDELINES.md) · [Report Bug](https://github.com/emonhassan83/cycle-control-hub-frontend/issues)

</div>

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Server)](#1-backend-setup-server)
  - [Frontend Setup (Client)](#2-frontend-setup-client)
- [Environment Variables Reference](#-environment-variables-reference)
- [Database Management (MongoDB & Mongoose)](#-database-management-mongodb--mongoose)
- [Security & Zero-Vulnerability Guarantee](#-security--zero-vulnerability-guarantee)
- [Documentation Links](#-documentation-links)
- [Contributing & License](#-contributing--license)

---

## ✨ Key Features

### 🛒 Buyer & Customer Experience
- **Interactive Bicycle Marketplace**: Browse new bikes and spare parts with comprehensive dynamic search (brand, model, type, price ranges, frame materials, colors).
- **Direct Bike Purchase & Order History**: Instant online ordering with real-time stock deduction, order cancellation with automatic restock, and invoice PDF downloading (`pdf-lib`).
- **Integrated Payment Gateway**: Seamless payment checkout via SSLCommerz gateway with automated IPN (Instant Payment Notification) validation.
- **Service Request & Maintenance History**: Request servicing for purchased bikes, track servicing milestones (`pending` → `confirmed` → `denied`), and monitor completed servicing history.
- **Loyalty Maintenance Discounts & Coupons**: Automated 5% discount per previous maintenance service (up to 50%) plus redeemable promotional coupon codes.
- **Product & Bike Reviews**: Community ratings and feedback with verified purchase integration.

### 🏪 Seller & Dealership Hub
- **Inventory Management**: Add and manage bikes and cycling accessories with high-resolution image uploads (`ImgBB`), release dates, specifications, and dimensions.
- **Variant Creation & Cloning**: Create custom variants from existing stock in seconds with automatic spec prefilling.
- **Bulk Operations**: Multi-select deletion and bulk actions for streamlined warehouse catalog management.
- **Sales Analytics Dashboard**: Daily, weekly, monthly, and yearly sales graphs powered by Recharts.
- **Service Queue Management**: Review and confirm customer repair and maintenance appointments.

### 🛡️ Administrative & Executive Operations
- **Role-Based Access Control (RBAC)**: Enforced segregation between `buyer`, `seller`, and `admin`.
- **User Governance**: Inspect registered accounts, toggle active/blocked account states, change user roles, and perform soft deletions.
- **Platform-Wide Inventory Oversight**: Global bike and accessory catalog inspection with administrative override capabilities.
- **Promotion & Coupon Engine**: Create, assign, update, and retire discount coupons applied to selected bikes or categories.
- **Executive Analytics (`/meta`)**: Real-time sales turnover, inventory counts, total users, and active service requests.

---

## 🏛 System Architecture

Cycle Control Hub follows a decoupled client-server architecture with strict separation of concerns:

```mermaid
graph TD
    subgraph Client ["Frontend (React 18 & Vite 8)"]
        UI["Ant Design (Antd 5) & Tailwind CSS"]
        State["Redux Toolkit & RTK Query"]
        AuthCtx["JWT Client Session & Persistent Storage"]
        PDFGen["Client Invoice Engine (pdf-lib)"]
    end

    subgraph Gateway ["Transport & Security Layer"]
        CORS["CORS & Cookie Parser"]
        AuthMid["JWT Auth Middleware & RBAC"]
        ZodVal["Zod 4 Schema Validation Engine"]
        Sanitize["NoSQL Sanitizer & ReDoS Guard"]
    end

    subgraph Server ["Backend (Node.js & Express TypeScript)"]
        Routes["Modular Routes (/api/v1)"]
        Controllers["Controllers (sendResponse)"]
        Services["Domain Services (Business Logic)"]
        QBuilder["Mongoose QueryBuilder Engine"]
    end

    subgraph Data ["Data & Third-Party Integrations"]
        Mongoose["Mongoose ODM (Schema Layer)"]
        DB[("MongoDB Atlas Database")]
        SSL["SSLCommerz Payment Gateway"]
        SMTP["Google SMTP Service (Nodemailer)"]
    end

    Client -->|HTTPS REST API / JSON| Gateway
    Gateway --> Routes
    Routes --> Controllers
    Controllers --> Services
    Services --> QBuilder
    QBuilder --> Mongoose
    Mongoose --> DB
    Services -->|Payment Validation / IPN| SSL
    Services -->|Password Recovery Emails| SMTP
```

For complete sequence diagrams, transaction state machines, and data models, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | **React 18**, **Vite 8**, **TypeScript 5**, **Ant Design (Antd 5)**, **Tailwind CSS**, **Redux Toolkit & RTK Query**, **React Hook Form**, **Recharts**, **Lucide React**, **Sonner**, **pdf-lib** |
| **Backend** | **Node.js**, **Express.js**, **TypeScript 5**, **Mongoose 8**, **MongoDB Atlas**, **Bcrypt**, **JSON Web Tokens (JWT)**, **Nodemailer 10**, **Zod 4**, **SSLCommerz LTS** |
| **DevOps & Tooling** | **ESLint**, **Prettier**, **PostCSS**, **Git**, **Vercel** |

---

## 📂 Project Directory Structure

```text
cycle-manage/
├── client/                     # Vite 8 & React 18 Frontend Application
│   ├── src/
│   │   ├── assets/             # SVGs, icons, and hero banners
│   │   ├── components/         # Shared UI, dialogs, forms, loaders, PDFs
│   │   ├── pages/              # Admin, Seller, Buyer, and Auth views
│   │   ├── redux/              # Redux store, baseApi, and feature slices
│   │   ├── routes/             # Protected routes and role-based routing
│   │   ├── types/              # TypeScript interfaces and response schemas
│   │   ├── utils/              # Token verification, sidebar generators
│   │   ├── App.tsx             # Main client shell
│   │   └── main.tsx            # DOM root bootstrap
│   ├── public/                 # Static assets & redirects
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── server/                     # Express.js & TypeScript Backend REST API
│   ├── src/
│   │   ├── app/
│   │   │   ├── builder/        # Reusable QueryBuilder (search, filter, sort, paginate)
│   │   │   ├── config/         # Environment variables & runtime constants
│   │   │   ├── errors/         # Global AppError, Cast, Duplicate, and Zod error handlers
│   │   │   ├── middleware/     # JWT Auth, Global Error Handler, Zod validation
│   │   │   ├── modules/        # Domain modules (Auth, User, Bike, Service, Buyer, Coupon, Review, Meta, SSL)
│   │   │   ├── payment/        # SSLCommerz controller, route, and payment verification
│   │   │   ├── routes/         # Centralized /api/v1 router
│   │   │   └── utils/          # catchAsync, sendResponse, emailSender
│   │   ├── app.ts              # Express configuration, CORS, parser stack
│   │   └── server.ts           # Server bootstrap and MongoDB connection
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                       # Comprehensive Architecture & API Documentation
│   ├── API_GUIDELINES.md       # Full REST API specifications, query filters & endpoints
│   └── ARCHITECTURE.md         # Layered design, ER diagrams & sequence flows
├── .gitignore                  # Global Git ignore rules
└── README.md                   # Project overview & quickstart
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- **Node.js**: `v20.x` or higher (LTS recommended)
- **npm**: `v10.x` or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection URI
- **Git**

---

### 1. Backend Setup (Server)

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in `server/` using the template below:
   ```env
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:5173
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cycle-control-manager?retryWrites=true&w=majority

   # Password Hashing & JWT Security
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=your_super_secret_access_token_key_here
   JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_here
   JWT_ACCESS_EXPIRE_IN=7d
   JWT_REFRESH_EXPIRE_IN=365d

   # Password Recovery
   RESET_PASS_TOKEN_EXPIRES_IN=10m
   RESET_PASS_LINK=http://localhost:5173/reset-password

   # SMTP Configuration (Nodemailer)
   EMAIL=your-service-email@gmail.com
   APP_PASS=your-google-app-password

   # SSLCommerz Payment Gateway
   STORE_ID=your_sslcommerz_store_id
   STORE_PASS=your_sslcommerz_store_password
   SUCCESS_URL=http://localhost:5173/payment?status=success
   CANCEL_URL=http://localhost:5173/payment?status=cancel
   FAIL_URL=http://localhost:5173/payment?status=fail
   SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v3/api.php
   SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
   ```

4. **Build TypeScript source**:
   ```bash
   npm run build
   ```

5. **Start development server**:
   ```bash
   npm run start:dev
   ```
   *The server will start listening at `http://localhost:5000`.*

---

### 2. Frontend Setup (Client)

1. **Navigate to the client directory**:
   ```bash
   cd ../client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in `client/`:
   ```env
   VITE_BASE_URL=http://localhost:5000/api/v1
   IMGBB_KEY=your_imgbb_api_key_for_image_hosting
   ```

4. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   *The client will be accessible at `http://localhost:5173`.*

---

## 🔑 Environment Variables Reference

### Backend (`server/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Application runtime environment | `development` / `production` |
| `PORT` | API listen port | `5000` |
| `CLIENT_URL` | Trusted CORS origin for client | `http://localhost:5173` |
| `DATABASE_URL` | MongoDB connection URI | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `BCRYPT_SALT_ROUNDS` | Salt factor for password hashing | `12` |
| `JWT_ACCESS_SECRET` | Secret key for access token signing | `random_64_char_hex_secret` |
| `JWT_ACCESS_EXPIRE_IN` | Access token lifespan | `7d` |
| `JWT_REFRESH_SECRET` | Secret key for refresh token signing | `random_128_char_hex_secret` |
| `JWT_REFRESH_EXPIRE_IN`| Refresh token lifespan | `365d` |
| `RESET_PASS_LINK` | Client password reset endpoint URL | `http://localhost:5173/reset-password` |
| `EMAIL` | Sender email address for SMTP | `notifications@cyclecontrol.com` |
| `APP_PASS` | Google app password for SMTP | `abcd efgh ijkl mnop` |
| `STORE_ID` | SSLCommerz Merchant Store ID | `cycle_store_sandbox` |
| `STORE_PASS` | SSLCommerz Merchant Store Password | `cycle_store_pass@ssl` |

### Frontend (`client/.env.local`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_BASE_URL` | Endpoint of the backend REST API | `http://localhost:5000/api/v1` |
| `IMGBB_KEY` | Public ImgBB API token for image uploads | `a5f43b2f693cc8d613...` |

---

## 🗄 Database Management (MongoDB & Mongoose)

Cycle Control Hub utilizes **Mongoose ODM** with strict schemas, indexes, and document relationship referencing:

- **Entity Indexing**: Unique index on `User.email` and `Coupon.name` to prevent race condition duplicates.
- **Cascading Stock Reductions**: Integrated inventory deduction inside `purchaseBikeIntoDB` and automatic restock upon order cancellation.
- **QueryBuilder Engine**: Fluent API layer supporting `.search()`, `.filter()`, `.sort()`, `.paginate()`, and `.fields()` with automatic regex metacharacter escaping and operator injection sanitization.
- **Soft Deletion Pattern**: Bicycles, users, and coupons utilize non-destructive `isDeleted: Boolean` flags preserving referential integrity for historical orders.

---

## 🔒 Security & Zero-Vulnerability Guarantee

Cycle Control Hub is engineered to adhere to strict enterprise security standards:

- **0 Known Vulnerabilities**: Both `client` and `server` pass `npm audit` with **0 vulnerabilities**.
- **Sanitized Supply Chain**: Guaranteed clean codebase with all unauthorized injection scripts purged and dependency overrides locked in (`package-lock.json`).
- **NoSQL Injection Defense**: Dynamic queries strip any untrusted object keys starting with `$` to prevent MongoDB operator injection.
- **ReDoS Mitigation**: Regular expressions in text searching escape all metacharacters (`.*+?^${}()|[\]\\`) preventing denial-of-service via catastrophic backtracking.
- **Strict Object Level Authorization (IDOR)**: Sellers can only modify/delete their own bike inventory; buyers can only cancel or update their own service tickets and orders.
- **Protected User Profile Mutation**: Profile update endpoints whitelist fields (`name`, `contactNumber`, `address`, `photoUrl`, `gender`) to prevent privilege escalation into `admin` roles or unauthorized status unblocking.
- **Hardened TLS / SSL Configuration**: SMTP transport enforces strict certificate verification (`rejectUnauthorized: true`), preventing Man-in-the-Middle (MITM) attacks.
- **Production Error Sanitization**: Internal database error stacks and driver payloads are stripped in production environments.

---

## 📚 Documentation Links

Detailed engineering specifications are available in the `docs/` directory:

- 📘 [API Guidelines & Endpoints](docs/API_GUIDELINES.md) — Comprehensive reference covering all endpoints across Auth, User, Bike Inventory, Product, Servicing, Coupon, Review, Sales, and Payment modules.
- 📐 [System Architecture & Design Blueprint](docs/ARCHITECTURE.md) — Detailed layered architecture, entity-relationship diagrams, payment state machine, and transaction sequence flows.

---

## 🤝 Contributing & License

Contributions, feedback, and pull requests are welcomed!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Distributed under the **MIT License**. See `LICENSE` for more information.

