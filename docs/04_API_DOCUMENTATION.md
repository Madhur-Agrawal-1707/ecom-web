# 📄 API Documentation

## Fashion E-Commerce Platform

Version: 1.0.0

Architecture: REST API

Backend: Node.js + Express.js

Database: MongoDB

Authentication: JWT + HttpOnly Cookies

---

# API Standards

## Base URL

Development

/api/v1

Production

/api/v1

---

# Response Format

## Success

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": {}
}
```

---

# Authentication

Authentication is required for protected routes.

JWT is stored inside HttpOnly Cookies.

User Roles

- User
- Admin

---

# Authentication APIs

## Register

POST

/api/v1/auth/register

Authentication

No

Body

```json
{
    "name":"",
    "email":"",
    "password":""
}
```

Validation

- Email unique
- Password minimum 8 characters

Response

User Created

---

## Login

POST

/api/v1/auth/login

Authentication

No

Body

```json
{
    "email":"",
    "password":""
}
```

Response

JWT Cookie

User Information

---

## Google Login

POST

/api/v1/auth/google

Authentication

No

Body

Google ID Token

Response

JWT Cookie

---

## Logout

POST

/api/v1/auth/logout

Authentication

Yes

Response

Cookie Cleared

---

## Get Current User

GET

/api/v1/auth/me

Authentication

Yes

Response

Current User

---

## Forgot Password

POST

/api/v1/auth/forgot-password

---

## Reset Password

POST

/api/v1/auth/reset-password

---

# Product APIs

---

## Get Products

GET

/api/v1/products

Public

Supports

Pagination

Search

Sorting

Filtering

Query Parameters

page

limit

category

price

size

color

fabric

occasion

discount

sort

search

Example

/products?page=1&limit=12&category=kurti

---

## Get Single Product

GET

/api/v1/products/:slug

Public

Returns

Complete Product Details

Variants

Images

Related Products

---

## Create Product

POST

/api/v1/products

Authentication

Admin

Request

Multipart Form Data

Includes

Images

Product Details

Variants

---

## Update Product

PUT

/api/v1/products/:id

Authentication

Admin

---

## Delete Product

DELETE

/api/v1/products/:id

Authentication

Admin

Soft Delete

---

## Get Featured Products

GET

/api/v1/products/featured

---

## Get New Arrivals

GET

/api/v1/products/new-arrivals

---

## Get Most Picked

GET

/api/v1/products/most-picked

---

## Get Biggest Discounts

GET

/api/v1/products/biggest-discounts

---

# Category APIs

---

## Get Categories

GET

/api/v1/categories

Public

---

## Get Category

GET

/api/v1/categories/:slug

---

## Create Category

POST

/api/v1/categories

Admin

---

## Update Category

PUT

/api/v1/categories/:id

Admin

---

## Delete Category

DELETE

/api/v1/categories/:id

Admin

Soft Delete

---

# Cart APIs

---

## Get Cart

GET

/api/v1/cart

User

---

## Add To Cart

POST

/api/v1/cart

User

---

## Update Cart Item

PATCH

/api/v1/cart/:id

User

---

## Remove Cart Item

DELETE

/api/v1/cart/:id

User

---

## Clear Cart

DELETE

/api/v1/cart

User

---

# Address APIs

---

## Get Addresses

GET

/api/v1/address

User

---

## Add Address

POST

/api/v1/address

User

---

## Update Address

PUT

/api/v1/address/:id

User

---

## Delete Address

DELETE

/api/v1/address/:id

User

---

## Set Default Address

PATCH

/api/v1/address/default/:id

User

---

# Order APIs

---

## Create Order

POST

/api/v1/orders

User

---

## Get My Orders

GET

/api/v1/orders

User

---

## Get Single Order

GET

/api/v1/orders/:id

User

---

## Cancel Order

PATCH

/api/v1/orders/:id/cancel

User

Only before shipping

---

# Admin Order APIs

---

## Get All Orders

GET

/api/v1/admin/orders

Admin

---

## Update Order Status

PATCH

/api/v1/admin/orders/:id

Admin

Statuses

Pending

Confirmed

Packed

Shipped

Delivered

Cancelled

---

# Banner APIs

---

## Get Active Banners

GET

/api/v1/banners

Public

---

## Create Banner

POST

/api/v1/banners

Admin

---

## Update Banner

PUT

/api/v1/banners/:id

Admin

---

## Delete Banner

DELETE

/api/v1/banners/:id

Admin

---

# Settings APIs

---

## Get Store Settings

GET

/api/v1/settings

Public

---

## Update Store Settings

PUT

/api/v1/settings

Admin

---

# Payment APIs

---

## Create Razorpay Order

POST

/api/v1/payment/create-order

User

---

## Verify Payment

POST

/api/v1/payment/verify

User

---

## Payment Webhook

POST

/api/v1/payment/webhook

Razorpay

---

# File Upload APIs

---

## Upload Product Images

POST

/api/v1/upload/products

Admin

---

## Delete Product Image

DELETE

/api/v1/upload/products/:id

Admin

---

# Search APIs

---

## Search Products

GET

/api/v1/search

Query

search

Returns

Matching Products

---

# Admin Dashboard APIs

---

## Dashboard Overview

GET

/api/v1/admin/dashboard

Returns

Revenue

Orders

Customers

Products

Low Stock

Recent Orders

---

# Error Codes

400

Bad Request

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

422

Validation Error

500

Internal Server Error

---

# Pagination

Standard

?page=1

&limit=10

---

# Sorting

Newest

Oldest

Price Low

Price High

Most Popular

Highest Discount

---

# Filtering

Category

Color

Fabric

Size

Occasion

Availability

Discount

---

# Validation

Express Validator

Zod (Future)

Every request should validate

Request Body

Query

Params

Headers

---

# Logging

Morgan

Request Logs

Error Logs

Future

Winston

---

# Rate Limiting

Authentication Routes

5 requests / minute

General APIs

100 requests / minute

---

# API Goals

✓ Secure

✓ RESTful

✓ Predictable

✓ Scalable

✓ Easy to Consume

✓ Well Documented