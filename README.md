# RISE International - NGO Platform & Admin CMS

> **“Empowering Communities. Transforming Lives.”**
> Official Platform for RISE International, registered 501(c)(3) global nonprofit organization.

---

## 🌍 Platform Overview

RISE International is an enterprise-grade, CMS-driven web platform designed for international non-governmental operations across four foundational pillars:
1. **Education & Child Literacy**
2. **Community Health & Clean Water**
3. **Emergency Humanitarian Relief**
4. **Economic Empowerment & Microfinance**

The platform consists of a **React + TypeScript + Tailwind CSS** frontend paired with a modular **Node.js + Express + TypeScript + MongoDB** REST API backend and an **Admin CMS Control Panel**.

---

## 🏗️ Architecture & Technology Stack

### Backend Stack
- **Runtime & Language:** Node.js (v20+) with TypeScript (ESM, NodeNext)
- **Framework:** Express.js
- **Database & ODM:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) stored in secure HTTP-only cookies and Authorization Bearer headers
- **Password Security:** Salted `bcryptjs` hashing (10 rounds)
- **Validation:** Server-side request sanitization using `zod` schemas
- **Security Middleware:** Helmet security headers, CORS origin enforcement, Rate Limiting (`express-rate-limit`)
- **File Uploads & Media Processing:** `multer` memory storage with `sharp` pipeline (WebP conversion, auto-rotation, dimensional resizing)
- **Payment Abstraction:** PCI-compliant session initiation and HMAC webhook signature verification (Stripe / provider abstraction)
- **Email Service:** Nodemailer template engine with transactional alerts for contact inquiries, volunteer applications, and donation receipts

### Frontend Stack
- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design tokens matching brand guidelines
- **Routing:** React Router v6 with code-splitting and dynamic suspense boundaries
- **CMS Interface:** Responsive, authenticated admin layout with permission-based menu rendering

---

## 🔐 Default Administrative Credentials

A default Super Administrator account is seeded automatically:

| Attribute | Credential |
| :--- | :--- |
| **Portal URL** | `http://localhost:5173/admin/login` |
| **Email** | `admin@riseintl.org` |
| **Password** | `Admin@Rise2026!` |
| **Access Role** | `super_admin` |

*(Note: In production environments, immediately change the initial password upon initial deployment.)*

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB Server running locally on port 27017 or a MongoDB Atlas URI

### 2. Configure Backend Environment
Navigate to `server/` and create your `.env` file (copied from `.env.example`):
```bash
cd server
copy .env.example .env
```
Default configuration values:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/rise_international_db
JWT_SECRET=rise_international_super_secret_jwt_key_2026_production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
UPLOAD_DIR=./uploads
```

### 3. Install Dependencies & Seed Database
```bash
# In server directory:
npm install
npm run seed
```
This populates:
- Super Admin account (`admin@riseintl.org`)
- The 4 Core Programmes
- Verified Impact Statistics
- Initial Field Stories & News Articles
- Website Settings & SEO Defaults

### 4. Start Backend Server
```bash
# Development mode with hot-reload:
npm run dev

# Or build and run production bundle:
npm run build
npm start
```
The REST API will be operational on `http://localhost:5000`.

### 5. Start Frontend Application
In the project root directory:
```bash
# Install root dependencies
npm install

# Start development server
npm run dev

# Or compile production bundle
npm run build
npm run preview
```
Visit `http://localhost:5173` to explore the public website, or navigate to `http://localhost:5173/admin/login` to access the Admin CMS.

---

## 📡 REST API Reference

### Public Endpoints (`/api` or `/api/v1`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & database connection status |
| `GET` | `/api/settings/public` | Public site configuration, contact info, SEO metadata |
| `GET` | `/api/programmes` | List published programmes |
| `GET` | `/api/programmes/slug/:slug` | Retrieve single programme by slug |
| `GET` | `/api/impact/stats` | List active impact statistics |
| `GET` | `/api/stories` | List published field stories (with pagination & category filter) |
| `GET` | `/api/stories/slug/:slug` | Retrieve single field story |
| `GET` | `/api/news` | List published news articles & press releases |
| `GET` | `/api/news/slug/:slug` | Retrieve single news article |
| `GET` | `/api/team` | List verified team members |
| `GET` | `/api/partners` | List institutional partner organizations |
| `POST` | `/api/contact` | Submit contact inquiry (rate limited, email alert triggered) |
| `POST` | `/api/volunteer` | Submit volunteer application (rate limited, email alert triggered) |
| `POST` | `/api/newsletter/subscribe`| Join field dispatches mailing list |
| `POST` | `/api/donations/create-session` | Initiate donation intent & payment session |
| `POST` | `/api/donations/webhook` | Verified payment provider webhook handler |
| `GET` | `/api/donations/:txId/status` | Query donation transaction receipt status |

### Admin Endpoints (Require Authentication)
| Method | Endpoint | Roles | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Authenticate administrator credentials |
| `POST` | `/api/auth/logout` | Any | Clear session cookie |
| `GET` | `/api/auth/me` | Any | Fetch current logged-in profile |
| `POST` | `/api/auth/change-password` | Any | Change administrator password |
| `GET` | `/api/admin/dashboard` | Any | Retrieve operational metrics & recent activity |
| `GET` | `/api/admin/audit-logs` | Admin, Super Admin | Security action audit trail |
| `GET` | `/api/admin/users` | Super Admin | List admin users |
| `POST` | `/api/admin/users` | Super Admin | Create new staff user |
| `PUT` | `/api/admin/users/:id` | Super Admin | Update user role or active status |
| `DELETE`| `/api/admin/users/:id` | Super Admin | Remove staff user |
| `*` | `/api/programmes/admin/*` | Editor, Admin, Super Admin | Programmes CRUD, sort order, and status toggles |
| `*` | `/api/impact/admin/*` | Editor, Admin, Super Admin | Impact stats CRUD and reordering |
| `*` | `/api/stories/admin/*` | Editor, Admin, Super Admin | Field stories CMS |
| `*` | `/api/news/admin/*` | Editor, Admin, Super Admin | News articles CMS |
| `*` | `/api/donations/admin/*` | Admin, Super Admin | Contribution ledger and status management |
| `*` | `/api/volunteer/admin/*` | Admin, Super Admin | Volunteer application review and notes |
| `*` | `/api/contact/admin/*` | Admin, Super Admin | Inquiries inbox and status resolution |
| `*` | `/api/newsletter/admin/*` | Admin, Super Admin | Subscriber list management and export |
| `*` | `/api/settings/admin` | Admin, Super Admin | Organization settings and homepage hero CMS |
| `POST` | `/api/admin/uploads/image` | Any Admin | Sharp image processing and WebP conversion |

---

## 🔒 Security Architecture
- **Zero Raw Card Storage:** Credit card details are never transmitted through or retained on application servers. Payment sessions interact exclusively with PCI-compliant payment gateways.
- **Role-Based Access Control (RBAC):** Three strict permission levels (`super_admin`, `admin`, `editor`). Safeguards prevent removal or deactivation of the last remaining super administrator.
- **Audit Logging:** Administrative operations (creations, deletions, status changes, logins) write persistent logs containing operator email, action type, resource ID, and client IP.
- **Input Sanitization:** Every incoming request body and query parameter is parsed against strict Zod schemas, stripping unexpected fields and preventing prototype pollution.
- **Rate Limiting:** Protects authentication endpoints, contribution sessions, and form submission APIs against automated abuse and denial of service attempts.

---

## 🧪 Testing & Verification

1. **Backend Verification:**
   ```bash
   cd server
   npm run build
   ```
   *Result: 0 errors (TypeScript strict compilation).*

2. **Frontend Verification:**
   ```bash
   npm run build
   ```
   *Result: 0 errors (Vite production bundle generated).*

3. **Live Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   *Returns `{ "success": true, "status": "ok", "database": "connected" }`.*

---

## 📄 License & Organization Info

- **Organization:** RISE International
- **Registration:** 501(c)(3) Nonprofit Organization
- **Email:** `info@riseintl.org`
- **Phone:** `+49 1520-6777889`
