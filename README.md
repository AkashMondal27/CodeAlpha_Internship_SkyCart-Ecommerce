# SkyCart

> A full-stack e-commerce application built with a React/Vite frontend and a Node.js/Express backend, with MongoDB/Mongoose data persistence, JWT-based authentication, Stripe payment integration, Cloudinary media handling, email/OTP utilities, cart and order management, and an administration interface.

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Core Capabilities](#2-core-capabilities)
- [3. Technology Stack](#3-technology-stack)
- [4. Architecture](#4-architecture)
- [5. Repository Structure](#5-repository-structure)
- [6. Backend Architecture](#6-backend-architecture)
- [7. Frontend Architecture](#7-frontend-architecture)
- [8. Application Flow](#8-application-flow)
- [9. Authentication and Authorization](#9-authentication-and-authorization)
- [10. Payments](#10-payments)
- [11. File and Image Handling](#11-file-and-image-handling)
- [12. Email and OTP](#12-email-and-otp)
- [13. Data Model](#13-data-model)
- [14. Frontend State Management](#14-frontend-state-management)
- [15. UI and User Experience](#15-ui-and-user-experience)
- [16. Configuration and Environment Variables](#16-configuration-and-environment-variables)
- [17. Installation](#17-installation)
- [18. Development](#18-development)
- [19. Production Build](#19-production-build)
- [20. API Organization](#20-api-organization)
- [21. Security Engineering](#21-security-engineering)
- [22. Error Handling](#22-error-handling)
- [23. Validation](#23-validation)
- [24. Quick Start](#24-quick-start)
- [25. Credits](#25-credits)

---

# 1. Project Overview

SkyCart is organized as a two-part full-stack application:

| Layer | Directory | Primary Responsibility |
|---|---|---|
| Frontend | `frontend/` | React-based web application, routing, UI, client state, checkout/payment UX |
| Backend | `server/` | Express API, authentication, business logic, database access, media and email services |
| Database | External MongoDB | Persistent application data through Mongoose |
| Payments | External Stripe service | Payment processing through Stripe |
| Media | External Cloudinary service | Image/media storage and delivery |
| Email | SMTP/email provider through Nodemailer | OTP and order-confirmation email delivery |

The repository is intentionally separated into frontend and server applications so that each side can be developed, tested, deployed, and scaled independently.

---

# 2. Core Capabilities

The repository structure shows dedicated application modules for the following areas:

### Customer experience

- Home page and hero section
- Product browsing
- Individual product pages
- Product cards
- Shopping cart
- Checkout
- Payment
- Order processing
- Order viewing
- User login
- OTP verification
- User profile
- Address management
- About Us
- Privacy Policy
- Terms and Conditions
- Not-found handling

### Administration

The frontend contains an administrative dashboard and dedicated admin components for:

- Admin dashboard
- Administrative information
- Order administration
- Product/category administration
- Admin access requests

The backend contains dedicated admin authorization middleware and statistics routes.

### Commerce backend

The backend is organized around:

- Users
- Products
- Product retrieval
- Product updates
- Product image updates
- Cart
- Addresses
- Orders
- OTP records
- Statistics
- Email notifications

### Integrations

The dependency configuration includes:

- Stripe
- Cloudinary
- Nodemailer
- MongoDB through Mongoose
- JWT
- Multer
- Axios on the frontend

---

# 3. Technology Stack

## 3.1 Frontend

| Technology | Purpose |
|---|---|
| React `19.2.8` | UI and component architecture |
| React DOM `19.2.8` | Browser rendering |
| Vite `8.2.2` | Development server and production bundling |
| React Router DOM `7.18.2` | Client-side routing |
| Tailwind CSS `4.3.3` | Utility-first styling |
| `@tailwindcss/vite` | Tailwind/Vite integration |
| shadcn `4.19.0` | UI component tooling |
| Base UI React | Accessible UI primitives |
| Lucide React | Icon system |
| React Icons | Additional icon library |
| Axios `1.20.0` | HTTP requests |
| React Hot Toast | User-facing notifications |
| Recharts `3.8.0` | Charts and analytics |
| Swiper `14.2.0` | Sliders/carousels |
| Embla Carousel React | Carousel functionality |
| Moment `2.30.1` | Date/time formatting |
| js-cookie | Browser cookie handling |
| html-to-image | HTML-to-image conversion |
| jsPDF | PDF generation |
| Formspree React | Form submission integration |
| `@stripe/stripe-js` | Stripe browser integration |

## 3.2 Backend

| Technology | Purpose |
|---|---|
| Node.js | Server-side JavaScript runtime |
| Express `5.2.1` | HTTP API framework |
| Mongoose `9.9.2` | MongoDB object modeling |
| MongoDB | Application database |
| JSON Web Token `9.0.3` | Token-based authentication |
| bcryptjs `3.0.3` | Password hashing |
| Multer `2.2.0` | Multipart/file upload processing |
| Cloudinary `2.10.0` | Image/media service integration |
| Stripe `22.6.1` | Server-side payment integration |
| Nodemailer `9.0.5` | Email delivery |
| CORS `2.8.6` | Cross-origin request handling |
| dotenv `17.4.2` | Environment configuration |
| datauri `4.1.0` | Data URI/file conversion support |

## 3.3 Development tooling

| Tool | Purpose |
|---|---|
| Vite | Frontend development/build |
| ESLint | Frontend linting |
| Nodemon | Backend development auto-reload |
| shadcn CLI | UI component generation/management |

---

# 4. Architecture

At a high level:

```text
                         ┌─────────────────────────┐
                         │        Browser          │
                         │                         │
                         │       React App         │
                         │   Vite + Tailwind CSS   │
                         └────────────┬────────────┘
                                      │
                                      │ HTTP / JSON
                                      ▼
                         ┌─────────────────────────┐
                         │      Express API        │
                         │                         │
                         │ Routes                  │
                         │   ↓                     │
                         │ Middleware              │
                         │   ↓                     │
                         │ Controllers             │
                         │   ↓                     │
                         │ Models / Services       │
                         └──────┬─────┬──────┬─────┘
                                │     │      │
                    ┌───────────┘     │      └────────────┐
                    ▼                 ▼                   ▼
              ┌──────────┐      ┌──────────┐       ┌──────────┐
              │ MongoDB  │      │ Stripe   │       │Cloudinary│
              │ Mongoose │      │ Payments │       │  Media   │
              └──────────┘      └──────────┘       └──────────┘
                                      │
                                      ▼
                                ┌────────────┐
                                │ Nodemailer │
                                │ OTP/Email  │
                                └────────────┘
```

The frontend owns presentation and client-side interaction. The backend owns business rules, persistence, authentication/authorization boundaries, payment-server integration, uploads, and email utilities.

---

# 5. Repository Structure

The following structure is based on the project tree supplied with the project.

> `node_modules/` directories are intentionally excluded from the documentation tree because they are generated dependency installations and should not be committed.

```text
.
├── .git/
│
├── frontend/
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── bg image.jpg
│   │   ├── bg image.png
│   │   ├── bg image2.jpg
│   │   ├── empthyCardImage.png
│   │   ├── favicon.png
│   │   ├── image.png
│   │   └── notFound.png
│   │
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       │
│       ├── assets/
│       │   ├── hero.png
│       │   ├── react.svg
│       │   └── vite.svg
│       │
│       ├── components/
│       │   ├── admin/
│       │   │   ├── HomeAdmin.jsx
│       │   │   ├── InfoAdmin.jsx
│       │   │   ├── OrdersAdmin.jsx
│       │   │   └── ProductCategories.js
│       │   ├── ui/
│       │   │   ├── badge.jsx
│       │   │   ├── button.jsx
│       │   │   ├── card.jsx
│       │   │   ├── carousel.jsx
│       │   │   ├── chart.jsx
│       │   │   ├── dialog.jsx
│       │   │   ├── dropdown-menu.jsx
│       │   │   ├── input.jsx
│       │   │   ├── label.jsx
│       │   │   ├── pagination.jsx
│       │   │   ├── select.jsx
│       │   │   └── table.jsx
│       │   ├── EmptyCart.jsx
│       │   ├── Footer.jsx
│       │   ├── Hero.jsx
│       │   ├── Loading.jsx
│       │   ├── Navbar.jsx
│       │   ├── ProductCard.jsx
│       │   ├── RequestAdminAccessDialog.jsx
│       │   ├── mode-toggle.jsx
│       │   └── theme-provider.jsx
│       │
│       ├── config/
│       │
│       ├── context/
│       │   ├── CartContext.jsx
│       │   ├── ProductContext.jsx
│       │   └── UserContext.jsx
│       │
│       ├── lib/
│       │   └── utils.js
│       │
│       ├── notifications/
│       │   └── CustomToaster.jsx
│       │
│       ├── pages/
│       │   ├── AboutUs.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── Cart.jsx
│       │   ├── Checkout.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── NotFound.jsx
│       │   ├── Order.jsx
│       │   ├── OrderPage.jsx
│       │   ├── OrderProcessing.jsx
│       │   ├── Payment.jsx
│       │   ├── PrivacyPolicy.jsx
│       │   ├── ProductPage.jsx
│       │   ├── Products.jsx
│       │   ├── TermsAndConditions.jsx
│       │   └── Verify.jsx
│       │
│       └── validation/
│           ├── emailValidation.js
│           └── otpValidation.js
│
├── server/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   │
│   └── src/
│       ├── app.js
│       ├── constant.js
│       ├── index.js
│       │
│       ├── controllers/
│       │   ├── address.controller.js
│       │   ├── cart.controller.js
│       │   ├── getAllProduct.controller.js
│       │   ├── getSingleProduct.controller.js
│       │   ├── getState.controller.js
│       │   ├── myProfile.controller.js
│       │   ├── order.controller.js
│       │   ├── product.controller.js
│       │   ├── updateImage.controller.js
│       │   ├── updateProduct.controller.js
│       │   └── user.controller.js
│       │
│       ├── db/
│       │   └── index.js
│       │
│       ├── middlwares/
│       │   ├── isAdmin.middleware.js
│       │   ├── isAuth.middleware.js
│       │   └── multer.middleware.js
│       │
│       ├── models/
│       │   ├── address.model.js
│       │   ├── cart.model.js
│       │   ├── order.model.js
│       │   ├── otp.model.js
│       │   ├── product.model.js
│       │   └── user.model.js
│       │
│       ├── routes/
│       │   ├── address.routes.js
│       │   ├── cart.routes.js
│       │   ├── order.routes.js
│       │   ├── product.routes.js
│       │   ├── stats.routes.js
│       │   └── user.routes.js
│       │
│       ├── templates/
│       │   ├── orderConfirmation.template.js
│       │   └── otp.template.js
│       │
│       └── utils/
│           ├── ApiError.js
│           ├── ApiResponse.js
│           ├── asyncHandler.js
│           ├── bufferGenerator.js
│           ├── cloudinary.js
│           ├── sendOrderConfirmation.js
│           └── sendOtp.js
│
└── project-structure.txt
```

---

# 6. Backend Architecture


## 6.1 Entry points

### `server/src/index.js`

Application startup entry point.

Responsibilities should remain focused on:

- Loading configuration
- Starting the server
- Establishing the database connection/startup sequence
- Bootstrapping the Express application

### `server/src/app.js`


This is the natural location for:

- Express configuration
- Middleware registration
- Route mounting
- Global application-level configuration

---

## 6.2 Controllers

Controllers contain request-level business logic.

| Controller | Responsibility indicated by filename |
|---|---|
| `address.controller.js` | Address operations |
| `cart.controller.js` | Cart operations |
| `getAllProduct.controller.js` | Product collection retrieval |
| `getSingleProduct.controller.js` | Single-product retrieval |
| `getState.controller.js` | State/statistical retrieval |
| `myProfile.controller.js` | Current-user profile operations |
| `order.controller.js` | Order operations |
| `product.controller.js` | Product operations |
| `updateImage.controller.js` | Product/image update operations |
| `updateProduct.controller.js` | Product update operations |
| `user.controller.js` | User/authentication-related operations |


---

# 7. Frontend Architecture


## 7.1 Pages

Pages represent route-level screens.

| Page | Role |
|---|---|
| `Home.jsx` | Main storefront |
| `Products.jsx` | Product listing |
| `ProductPage.jsx` | Product detail |
| `Cart.jsx` | Shopping cart |
| `Checkout.jsx` | Checkout |
| `Payment.jsx` | Payment experience |
| `OrderProcessing.jsx` | Order/payment processing state |
| `Order.jsx` | Order-related screen |
| `OrderPage.jsx` | Order detail/list presentation |
| `Login.jsx` | Authentication entry |
| `Verify.jsx` | Verification flow |
| `AdminDashboard.jsx` | Administrative area |
| `AboutUs.jsx` | Informational page |
| `PrivacyPolicy.jsx` | Privacy information |
| `TermsAndConditions.jsx` | Terms |
| `NotFound.jsx` | Fallback route |

## 7.2 Reusable components

The component layer includes:

- Navigation
- Footer
- Hero
- Product cards
- Loading states
- Empty cart UI
- Theme controls
- Admin-specific components
- Admin-access request dialog
- Toast notification integration

## 7.3 UI primitives

The project contains reusable UI components for:

- Buttons
- Cards
- Badges
- Dialogs
- Dropdown menus
- Inputs
- Labels
- Pagination
- Select controls
- Tables
- Carousels
- Charts



---

# 8. Application Flow

A typical customer flow is:

```text
Visitor
   │
   ▼
Home / Products
   │
   ▼
Product Details
   │
   ▼
Add to Cart
   │
   ▼
Cart
   │
   ▼
Checkout
   │
   ├── Address
   │
   ├── Order information
   │
   ▼
Payment
   │______________________ COD
   ▼                       |
   Online                  |
   │                       |
   ▼                       |
Stripe integration         |
   │                       |
   ▼                       |
Order processing           |
   │                       |
   ▼                       |
Order created/updated  <----
   │
   ▼
Confirmation / Order page
```

Authentication-related flow:

```text
Login
  │
  ▼
 verification
  │
  ▼
OTP verification where applicable
  │
  ▼
Authenticated session/token
  │
  ▼
Protected user functionality
```

Administrative flow:

```text
Admin Request to be Admin 
       │
       ▼
Admin User
       │
       ▼
Admin Dashboard
       │
       ├── Products
       ├── Orders
       ├── Information
       └── Statistics
```



---

# 9. Authentication and Authorization

The backend includes dedicated authentication and authorization middleware:

```text
server/src/middlwares/isAuth.middleware.js
server/src/middlwares/isAdmin.middleware.js
```

It also includes:

```text
server/src/models/user.model.js
server/src/models/otp.model.js
server/src/controllers/user.controller.js
```

and the backend depends on:

- `jsonwebtoken`
- `bcryptjs`




---

# 10. Payments

The project includes Stripe on both sides for online Payment :

| Layer | Package |
|---|---|
| Frontend | `@stripe/stripe-js` |
| Backend | `stripe` |

This is an appropriate separation:

```text
Frontend
   │
   │ Payment UI / Stripe.js
   ▼
Backend
   │
   │ Server-side Stripe operations
   ▼
Stripe
```




# 11. File and Image Handling

The backend includes:

```text
server/src/middlwares/multer.middleware.js
server/src/controllers/updateImage.controller.js
server/src/utils/cloudinary.js
server/src/utils/bufferGenerator.js
```

and dependencies:

- Multer
- Cloudinary
- datauri

This indicates a multipart upload pipeline with a media-service integration.

Conceptually:

```text
Browser
  │
  │ multipart/form-data
  ▼
Multer
  │
  ▼
Upload validation / buffer preparation
  │
  ▼
Cloudinary
  │
  ▼
Stored media URL / identifier
  │
  ▼
MongoDB document
```



# 12. Email and OTP

The backend contains dedicated email templates and utilities:

```text
server/src/templates/orderConfirmation.template.js
server/src/templates/otp.template.js

server/src/utils/sendOrderConfirmation.js
server/src/utils/sendOtp.js
```

Nodemailer is used for email transport.

The OTP model is:

```text
server/src/models/otp.model.js
```


---

# 13. Data Model

The repository contains six primary Mongoose model files.

| Model | Purpose |
|---|---|
| `user.model.js` | User/account data |
| `product.model.js` | Product/catalog data |
| `cart.model.js` | Shopping-cart data |
| `order.model.js` | Order/commerce records |
| `address.model.js` | Customer address data |
| `otp.model.js` | OTP/verification records |



---

# 14. Frontend State Management

The frontend contains three React contexts:

```text
src/context/CartContext.jsx
src/context/ProductContext.jsx
src/context/UserContext.jsx
```

This establishes three major client-state domains.

---

# 15. UI and User Experience

The frontend includes a modern component-oriented UI stack:

- Tailwind CSS
- shadcn
- Base UI
- Lucide React
- React Icons
- Recharts
- Swiper
- Embla Carousel
- React Hot Toast


## Design-system approach

Reusable primitives are stored under:

```text
src/components/ui/
```

## Responsive design

The UI should be treated as responsive across:

- Mobile
- Tablet
- Laptop
- Desktop
- Large displays



## Theme support

The repository contains:

```text
theme-provider.jsx
mode-toggle.jsx
```

which indicates a dedicated theme-management UI layer.
- Keep light and dark themes readable.


---

# 16. Configuration and Environment Variables

The backend uses `dotenv`, so secrets and environment-specific configuration should be stored outside source control.

A typical environment configuration may look like:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_long_random_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_publishable_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email / SMTP
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```



# 17. Installation

## Prerequisites

Install:

- Node.js
- npm
- MongoDB or a MongoDB-compatible hosted database
- Stripe account/configuration for payment functionality
- Cloudinary account/configuration for media functionality
- SMTP/email provider for email functionality

---

## 17.1 Clone the project

```bash
git clone <your-repository-url>
cd <project-directory>
```

---

## 17.2 Install backend dependencies

```bash
cd server
npm install
```

---

## 17.3 Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

# 18. Development

## Start the backend

From `server/`:

```bash
npm run dev
```

The backend development script uses Nodemon and starts:

```text
src/index.js
```

The production/start script is:

```bash
npm start
```

which runs:

```text
node src/index.js
```

---

## Start the frontend

From `frontend/`:

```bash
npm run dev
```

Vite starts the development server.

---

## Run frontend linting

```bash
npm run lint
```

---

## Build the frontend

```bash
npm run build
```

---

## Preview the production frontend build

```bash
npm run preview
```

---

# 19. Production Build

The frontend production workflow is:

```bash
cd frontend
npm install
npm run build
```

The backend does not have a separate compilation stage because it runs directly through Node.js:

```bash
cd server
npm install
npm start
```


---

# 20. API Organization

The backend route modules are organized by domain:

```text
/routes
├── address.routes.js
├── cart.routes.js
├── order.routes.js
├── product.routes.js
├── stats.routes.js
└── user.routes.js
```

A clean request lifecycle should follow:

```text
HTTP Request
     │
     ▼
Express Route
     │
     ▼
Middleware
     │
     │
     ▼
Controller
     │
     ▼
Model / External Service
     │
     ▼
ApiResponse / Error
     │
     ▼
HTTP Response
```

The repository also includes standardized response/error helpers:

```text
ApiError.js
ApiResponse.js
asyncHandler.js
```

This is useful for keeping controller responses consistent.

---

# 21. Security Engineering



## 21.1 Authentication

Use strong token validation and avoid trusting client-supplied identity fields.

## 21.2 Authorization

Every protected resource should validate ownership or role permissions server-side.

Examples:

```text
User A must not be able to access User B's order.
User A must not be able to modify another user's address.
Non-admin users must not execute admin operations.
```

## 21.3 OTP

OTP must never be stored in plaintext.

The backend includes `bcryptjs`, which is intended for otp  hashing.

## 21.4 Secrets

Never commit:

- JWT secrets
- Database passwords
- Stripe secret keys
- Cloudinary API secrets
- SMTP passwords
- Other private API credentials

## 21.5 CORS

The backend includes the `cors` package.

Production CORS should use an explicit allowlist rather than permitting arbitrary origins.

Conceptually:

```text
Allowed Frontend Origin
        │
        ▼
      CORS
        │
        ▼
    Express API
```

## 21.6 Input validation

Validate:

- IDs
- Email addresses
- OTP values
- Product quantities
- Prices
- Addresses
- Order data
- File uploads
- Query parameters

Never assume frontend validation is sufficient.

## 21.7 MongoDB security

Use:

- Strong database credentials
- Appropriate indexes
- Careful query construction

## 21.8 Payment security



```text
Browser
  ↓
Payment provider
  ↓
Trusted server-side verification
  ↓
Order status update
```


---

# 22. Error Handling

The backend includes:

```text
ApiError.js
ApiResponse.js
asyncHandler.js
```

A consistent API response pattern is recommended.

### Success

```json
{
  "success": true,
   "data": {},
  "message": "Operation completed successfully",
 
}
```

### Error

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

The exact response structure must match the implementation.

## Error categories

At minimum, distinguish:

| Category | Example |
|---|---|
| `400` | Invalid request data |
| `401` | Missing/invalid authentication |
| `403` | Authenticated but not authorized |
| `404` | Resource not found |
| `409` | Conflict |
| `422` | Validation failure |
| `429` | Rate limit exceeded |
| `500` | Unexpected server failure |
| `502/503` | External service/dependency failure |



---

# 23. Validation

The frontend contains dedicated validation utilities:

```text
src/validation/emailValidation.js
src/validation/otpValidation.js
```

This creates a clear boundary for reusable client-side validation.

However:

> Client-side validation is a user-experience feature, not a security boundary.

The backend must independently validate all sensitive and business-critical data.

For example:

```text
Frontend validation
       │
       ▼
Good UX
       │
       ▼
Backend validation
       │
       ▼
Actual security/business rule
```

---







## 24. Quick Start

```bash
# Terminal 1 — backend
cd server
npm install
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```

Then open the Vite development URL shown in the frontend terminal.

---

## Final Architecture Summary

```text
┌─────────────────────────────────────────────────────────────┐
│                         SKYCART                             │
├───────────────────────────────┬─────────────────────────────┤
│          FRONTEND             │           BACKEND            │
│                               │                             │
│ React                         │ Node.js                     │
│ Vite                          │ Express                     │
│ React Router                  │ Mongoose                    │
│ Tailwind CSS                  │ JWT                         │
│ shadcn / Base UI              │ bcryptjs                    │
│ Axios                         │ Multer                      │
│ Stripe.js                     │ Cloudinary                  │
│ Recharts                      │ Stripe                      │
│ Swiper / Embla                │ Nodemailer                  │
│ React Hot Toast               │ ApiError / ApiResponse      │
│ Context API                   │ Auth/Admin middleware       │
│                               │                             │
│ Pages                         │ Routes                      │
│ Components                    │ Controllers                 │
│ UI primitives                 │ Models                      │
│ Contexts                      │ Utilities                   │
│ Validation                    │ Email templates             │
└───────────────┬───────────────┴──────────────┬──────────────┘
                │                              │
                └──────────────┬───────────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
              MongoDB        Stripe       Cloudinary
                                             │
                                             ▼
                                         Email/SMTP
```
## 25. 👨‍💻 Credits

This project was **designed, developed, and maintained by me**.

I built SkyCart from the ground up, including the frontend experience, backend architecture, authentication, product management, cart and order workflows, payment integration, admin functionality, email/OTP flows, responsive UI, and overall application experience.

If you have any **feedback, suggestions, bug reports, or ideas for improvement**, I would be happy to hear from you.

### 💬 Feedback & Contact

If you find an issue or have a suggestion, please feel free to contact me.

- **Developer:** Akash Mondal
- **Email:** akashmondal102003@gmail.com
- **Phone:** 8250107704

> Your feedback is always welcome and can help make SkyCart better. ❤️

---

<p align="center">
  <strong>Built with ❤️ by Akash Mondal</strong>
  <br />
  <sub>Thank you for taking the time to explore SkyCart.</sub>
</p>