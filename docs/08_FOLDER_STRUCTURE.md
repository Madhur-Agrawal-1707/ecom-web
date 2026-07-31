# 📁 08_FOLDER_STRUCTURE.md

# Fashion E-Commerce Platform

Version: 1.0.0

---

# 📌 Architecture Overview

This project follows a **Monorepo Architecture**, where both the frontend and backend live in the same Git repository but are deployed independently.

**Architecture Style**

* Frontend → Feature-First Architecture
* Backend → Layered Architecture (Controller → Service → Repository)
* Database → MongoDB Atlas
* Authentication → JWT + Google OAuth + HttpOnly Cookies

---

# 📂 Project Structure

```text
fashion-ecommerce/

├── client/                # React Frontend
├── server/                # Express Backend
├── docs/                  # Project Documentation
├── .gitignore
├── README.md
└── package.json           # Optional root scripts
```

---

# 📂 Client Structure

```text
client/

├── public/

├── src/

│   ├── app/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── router.tsx
│   │   ├── providers.tsx
│   │   └── store.ts
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   ├── images/
│   │   └── logos/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   │
│   ├── features/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │
│   ├── lib/
│   │
│   ├── config/
│   │
│   ├── constants/
│   │
│   ├── styles/
│   │
│   ├── types/
│   │
│   └── utils/
│
├── .env
├── vite.config.ts
└── package.json
```

---

# 📂 Feature-First Architecture

Every business feature owns everything related to it.

```text
features/

auth/
products/
categories/
cart/
checkout/
orders/
profile/
addresses/
search/
dashboard/
banners/
settings/
home/
```

---

# Standard Feature Structure

Every feature follows exactly the same structure.

```text
feature-name/

├── api/
├── components/
├── constants/
├── hooks/
├── pages/
├── services/
├── store/
├── types/
├── utils/
├── validation/
└── index.ts
```

---

# Example — Products Feature

```text
products/

├── api/
│   ├── createProduct.ts
│   ├── deleteProduct.ts
│   ├── getProduct.ts
│   ├── getProducts.ts
│   └── updateProduct.ts
│
├── components/
│   ├── ProductCard/
│   ├── ProductGallery/
│   ├── ProductGrid/
│   ├── ProductInfo/
│   ├── ProductPrice/
│   ├── ProductVariants/
│   ├── ProductFilters/
│   └── RelatedProducts/
│
├── hooks/
│
├── pages/
│   ├── ProductListingPage.tsx
│   └── ProductDetailsPage.tsx
│
├── services/
│
├── store/
│
├── types/
│
├── utils/
│
├── validation/
│
├── constants/
│
└── index.ts
```

---

# Example — Auth Feature

```text
auth/

├── api/
├── components/
│   ├── LoginForm/
│   ├── RegisterForm/
│   ├── GoogleLoginButton/
│   └── ForgotPasswordForm/
│
├── hooks/
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── ForgotPasswordPage.tsx
│
├── services/
├── store/
├── types/
├── utils/
├── validation/
└── index.ts
```

---

# Global Components

Only reusable UI belongs here.

```text
components/

ui/

Button
Input
Textarea
Select
Checkbox
Switch
Modal
Drawer
Card
Badge
Avatar
Tabs
Accordion
Dropdown
Tooltip
Spinner
Skeleton
Toast
Pagination

--------------------------------

layout/

Navbar
Footer
Sidebar
Container
CustomerLayout
DashboardLayout

--------------------------------

shared/

EmptyState
ErrorState
LoadingState
Breadcrumb
SectionHeader
SearchBar
Price
Rating
DiscountBadge
```

---

# Global Hooks

These are application-wide hooks.

```text
hooks/

useDebounce
useLocalStorage
useMediaQuery
useScrollTop
useClickOutside
useWindowSize
```

---

# API Layer

Never call Axios directly inside components.

```text
products/

api/

getProducts.ts
getProduct.ts
createProduct.ts
updateProduct.ts
deleteProduct.ts
```

Components call feature services or hooks, not Axios directly.

---

# Feature Store

Each feature owns its own Redux logic.

```text
products/

store/

productSlice.ts
productSelectors.ts
productThunks.ts
```

Global Redux store only combines slices.

---

# App Folder

```text
app/

App.tsx

main.tsx

router.tsx

providers.tsx

store.ts
```

Responsibilities

* Application bootstrap
* Global providers
* Redux store
* Router
* Theme provider (Future)

---

# Services Folder

Only global services.

```text
services/

api.ts

axios.ts

requestInterceptor.ts

responseInterceptor.ts
```

---

# Config Folder

```text
config/

api.ts

google.ts

cloudinary.ts

environment.ts
```

---

# Utils Folder

```text
utils/

currency.ts

date.ts

discount.ts

slug.ts

pagination.ts

validators.ts
```

---

# Constants

```text
constants/

roles.ts

routes.ts

orderStatus.ts

paymentStatus.ts
```

---

# Styles

```text
styles/

globals.css

tailwind.css

animations.css
```

---

# 📂 Server Structure

```text
server/

├── src/
│
├── config/
│
├── controllers/
│
├── services/
│
├── repositories/
│
├── models/
│
├── routes/
│
├── middlewares/
│
├── validators/
│
├── utils/
│
├── constants/
│
├── interfaces/
│
├── helpers/
│
├── database/
│
├── uploads/
│
├── jobs/
│
├── app.ts
│
└── server.ts
│
├── .env
└── package.json
```

---

# Backend Layered Architecture

Every request follows the same flow.

```text
Client

↓

Routes

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

MongoDB
```

---

# Responsibilities

## Routes

* Define endpoints
* Attach middleware

Never write business logic.

---

## Middleware

* Authentication
* Authorization
* Validation
* Rate Limiting
* Error Handling
* File Upload

---

## Controllers

Responsibilities

* Receive request
* Validate request flow
* Call service
* Return response

No business logic.

---

## Services

Contains

* Business rules
* Payment logic
* Authentication logic
* Discount calculation
* Order processing

---

## Repositories

Only communicate with MongoDB.

No business logic.

---

## Models

```text
User

Product

Category

Order

Address

Banner

Settings
```

---

## Helpers

```text
Generate JWT

Hash Password

Verify Password

Cloudinary Upload

Send Email

Generate OTP
```

---

## Utils

```text
Pagination

Slug Generator

Currency Formatter

Response Formatter

Error Formatter
```

---

# Environment Files

Frontend

```text
client/.env
```

Contains only public values.

Example

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

Backend

```text
server/.env
```

Contains secrets.

Example

```env
MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
RAZORPAY_SECRET=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_API_SECRET=
```

Never expose backend secrets to the frontend.

---

# Deployment

Frontend

Vercel

↓

Backend

Render

↓

Database

MongoDB Atlas

All three are deployed independently.

---

# Security Principles

* Backend validates every request.
* Frontend is never trusted.
* JWT verification only on the backend.
* Passwords are hashed with bcrypt.
* Secrets remain in the backend.
* Use HttpOnly cookies for authentication.
* Validate all request bodies, params, and query strings.

---

# Naming Conventions

Folders

kebab-case

React Components

PascalCase

Hooks

camelCase

Interfaces

PascalCase

Types

PascalCase

Constants

UPPER_CASE

Files

camelCase

---

# Import Strategy

Use path aliases instead of long relative imports.

Example

```ts
import Button from "@/components/ui/Button";
import { ProductCard } from "@/features/products";
```

Avoid imports like:

```text
../../../../components/Button
```

---

# Documentation Structure

```text
docs/

01_PROJECT_OVERVIEW.md

02_FEATURES.md

03_DATABASE_SCHEMA.md

04_API_DOCUMENTATION.md

05_UI_PAGES.md

06_DESIGN_SYSTEM.md

07_COMPONENT_ARCHITECTURE.md

08_FOLDER_STRUCTURE.md

09_DEVELOPMENT_TODO.md

10_DEPLOYMENT.md

11_SECURITY.md

12_AI_PROMPTS.md

13_CHANGELOG.md
```

---

# Architecture Goals

* Feature-based frontend
* Layered backend
* Reusable code
* AI-friendly structure
* Easy onboarding
* Scalable architecture
* Production-ready
* Secure by design
* Maintainable for long-term development
