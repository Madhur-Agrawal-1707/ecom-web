# 📄 03_DATABASE_SCHEMA.md

# Fashion E-Commerce Platform

Version: 1.0.0

Database: MongoDB Atlas

ODM: Mongoose

---

# Database Design Principles

- Normalize where it makes sense.
- Avoid duplicate data.
- Keep documents lightweight.
- Use ObjectId references.
- Design for scalability.
- Make homepage sections data-driven.
- Support future features without schema redesign.

---

# Collections

1. Users
2. Products
3. Categories
4. Orders
5. Addresses
6. Banners
7. Settings

Future

8. Coupons
9. Reviews
10. Notifications

---

# 1. Users Collection

Purpose

Store customer and admin accounts.

Fields

_id

name

email

password

provider

avatar

phone

role

isVerified

isBlocked

defaultAddress

wishlist

cart

createdAt

updatedAt

Provider

local

google

Role

user

admin

Indexes

email (Unique)

phone

---

# 2. Categories Collection

Purpose

Store product categories.

Fields

_id

name

slug

description

image

parentCategory

sortOrder

isActive

seoTitle

seoDescription

createdAt

updatedAt

Examples

Kurti

Salwar Suit

Co-ord Set

Cotton Kurti

Rayon Kurti

Party Wear

Office Wear

---

# 3. Products Collection

Purpose

Store product information.

Fields

_id

name

slug

shortDescription

description

category

brand

fabric

occasion

tags

sku

originalPrice

salePrice

discountPercentage

images

variants

labels

status

seoTitle

seoDescription

createdAt

updatedAt

Status

Draft

Published

Archived

---

Images

Store as array

Example

Front

Back

Side

Zoom

Lifestyle

Maximum

10 Images

---

Variants

Each product contains multiple variants.

Variant

color

↓

sizes

↓

stock

Example

Blue

S

M

L

XL

Pink

S

M

L

---

Variant Structure

variantId

colorName

colorHex

images

sizes

Each size contains

size

stock

sku

---

Labels

featured

newArrival

trending

bestSeller

mostPicked

showOnHomepage

limitedStock

sale

---

Product Indexes

slug

category

tags

salePrice

discountPercentage

labels

---

# 4. Orders Collection

Purpose

Store customer orders.

Fields

_id

user

products

shippingAddress

paymentMethod

paymentStatus

orderStatus

subtotal

discount

shippingCharge

total

razorpayOrderId

razorpayPaymentId

notes

createdAt

updatedAt

---

Products Array

productId

variantId

size

color

quantity

price

subtotal

---

Payment Methods

Razorpay

COD

---

Payment Status

Pending

Paid

Failed

Refunded

---

Order Status

Pending

Confirmed

Packed

Shipped

Delivered

Cancelled

Returned (Future)

---

Indexes

user

orderStatus

paymentStatus

createdAt

---

# 5. Addresses Collection

Purpose

Store customer addresses.

Fields

_id

userId

fullName

phone

alternatePhone

house

area

landmark

city

state

country

postalCode

isDefault

createdAt

updatedAt

---

# 6. Banners Collection

Purpose

Manage homepage banners.

Fields

_id

title

subtitle

desktopImage

mobileImage

buttonText

buttonLink

priority

isActive

startDate

endDate

createdAt

updatedAt

---

# 7. Settings Collection

Purpose

Store business configuration.

Fields

storeName

logo

favicon

email

phone

whatsapp

address

socialLinks

shippingCharge

freeShippingLimit

codEnabled

maintenanceMode

instagramURL

facebookURL

youtubeURL

createdAt

updatedAt

---

# Future Collections

Coupons

Reviews

Notifications

Wishlist

Recently Viewed

Sales Reports

Audit Logs

---

# Relationships

User

↓

Orders

↓

Order Items

Product

↓

Category

Product

↓

Variants

↓

Sizes

User

↓

Addresses

User

↓

Wishlist

---

# Variant Design

Product

↓

Blue

↓

S → Stock

M → Stock

L → Stock

↓

Pink

↓

S → Stock

M → Stock

L → Stock

---

# Image Strategy

Product Images

Cloudinary URL

or

AWS S3 URL

Never store binary files inside MongoDB.

---

# Slug Strategy

Every product

Unique slug

Example

cotton-kurti-blue

Every category

Unique slug

Example

cotton-kurti

---

# Discount Strategy

Never manually enter

discountPercentage

Always calculate

(originalPrice - salePrice)

÷ originalPrice

×100

---

# Stock Strategy

Stock should exist only inside variants.

Never duplicate stock at product level.

Example

Blue

S → 10

M → 8

L → 5

Pink

S → 12

M → 7

---

# Soft Delete

Products

Categories

Users

Should use

isDeleted

instead of permanent deletion.

---

# Audit Fields

Every collection should include

createdAt

updatedAt

createdBy (Admin)

updatedBy (Admin)

where applicable.

---

# Security

Passwords

bcrypt hash

JWT stored in

HttpOnly Cookies

Sensitive keys

Environment Variables

---

# Naming Convention

Collections

camelCase

Fields

camelCase

Models

PascalCase

Files

kebab-case

---

# Validation Rules

Email

Unique

Phone

10 digits

Price

Greater than 0

Stock

Greater than or equal to 0

Discount

0 - 100

Slug

Unique

---

# Database Goals

✓ Scalable

✓ Reusable

✓ Optimized

✓ Easy to Query

✓ Future Ready

✓ Clean Relationships

✓ Minimal Redundancy