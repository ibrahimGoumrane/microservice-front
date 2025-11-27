# Frontend API Requirements Documentation

This document outlines all API endpoints required by the frontend application. This serves as a specification for the backend team to implement.

---

## Table of Contents
1. [Authentication Endpoints](#authentication-endpoints)
2. [Product Endpoints](#product-endpoints)
3. [Order Endpoints](#order-endpoints)
4. [User Endpoints](#user-endpoints)
5. [Cart Endpoints](#cart-endpoints)
6. [Common Response Formats](#common-response-formats)

---

## Authentication Endpoints

### 1. Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "roles": "ROLE_USER"
    }
  },
  "message": "Login successful"
}
```

---

### 2. Register
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "roles": "ROLE_USER"
    }
  },
  "message": "Registration successful"
}
```

---

### 3. Get Current User
**Endpoint:** `GET /auth/me`

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "roles": "ROLE_USER"
  },
  "message": "User information retrieved successfully"
}
```

---

### 4. Logout
**Endpoint:** `POST /auth/logout`

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

---

### 5. Refresh Token
**Endpoint:** `POST /auth/refresh-token`

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Token refreshed successfully"
}
```

---

## Product Endpoints

### 1. Get All Products (with Pagination)
**Endpoint:** `GET /products`

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `search` (string, optional): Search query
- `admin` (boolean, optional): Include admin-only data
- `paginated` (boolean, optional): Enable pagination

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "prod-1",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 99.99,
      "category": "Electronics",
      "stock": 50,
      "image": "/images/headphones.jpg",
      "rating": 4.5
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10
  }
}
```

---

### 2. Get Product by ID
**Endpoint:** `GET /products/{id}`

**Response (200 OK):**
```json
{
  "data": {
    "id": "prod-1",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 99.99,
    "category": "Electronics",
    "stock": 50,
    "image": "/images/headphones.jpg",
    "rating": 4.5
  }
}
```

---

### 3. Create Product (Admin Only)
**Endpoint:** `POST /products`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Request Body:**
```json
{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "image": "/images/headphones.jpg",
  "rating": 4.5
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "prod-1",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones",
    "price": 99.99,
    "category": "Electronics",
    "stock": 50,
    "image": "/images/headphones.jpg",
    "rating": 4.5
  },
  "message": "Product created successfully"
}
```

---

### 4. Update Product (Admin Only)
**Endpoint:** `PUT /products/{id}`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 89.99,
  "stock": 75
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "prod-1",
    "name": "Updated Product Name",
    "description": "High-quality wireless headphones",
    "price": 89.99,
    "category": "Electronics",
    "stock": 75,
    "image": "/images/headphones.jpg",
    "rating": 4.5
  },
  "message": "Product updated successfully"
}
```

---

### 5. Delete Product (Admin Only)
**Endpoint:** `DELETE /products/{id}`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Response (204 No Content)**

---

## Order Endpoints

### 1. Get All Orders (Admin Only)
**Endpoint:** `GET /orders`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "order-1",
      "userId": 1,
      "items": [
        {
          "product": {
            "id": "prod-1",
            "name": "Wireless Headphones",
            "price": 99.99,
            "image": "/images/headphones.jpg",
            "category": "Electronics"
          },
          "quantity": 2
        }
      ],
      "total": 199.98,
      "status": "pending",
      "shippingAddress": {
        "fullName": "John Doe",
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "createdAt": "2025-11-27T10:30:00Z"
    }
  ]
}
```

---

### 2. Get Order by ID
**Endpoint:** `GET /orders/{id}`

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "data": {
    "id": "order-1",
    "userId": 1,
    "items": [
      {
        "product": {
          "id": "prod-1",
          "name": "Wireless Headphones",
          "price": 99.99,
          "image": "/images/headphones.jpg",
          "category": "Electronics"
        },
        "quantity": 2
      }
    ],
    "total": 199.98,
    "status": "pending",
    "shippingAddress": {
      "fullName": "John Doe",
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "createdAt": "2025-11-27T10:30:00Z"
  }
}
```

---

### 3. Get User Orders
**Endpoint:** `GET /orders/user/{userId}`

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "order-1",
      "userId": 1,
      "items": [...],
      "total": 199.98,
      "status": "pending",
      "shippingAddress": {...},
      "createdAt": "2025-11-27T10:30:00Z"
    }
  ]
}
```

---

### 4. Create Order
**Endpoint:** `POST /orders`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "items": [
    {
      "productId": "prod-1",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "order-1",
    "userId": 1,
    "items": [...],
    "total": 199.98,
    "status": "pending",
    "shippingAddress": {...},
    "createdAt": "2025-11-27T10:30:00Z"
  },
  "message": "Order created successfully"
}
```

---

### 5. Update Order Status (Admin Only)
**Endpoint:** `PUT /orders/{id}`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Valid Status Values:**
- `pending`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

**Response (200 OK):**
```json
{
  "data": {
    "id": "order-1",
    "status": "shipped",
    ...
  },
  "message": "Order status updated successfully"
}
```

---

## User Endpoints

### 1. Get All Users (Admin Only)
**Endpoint:** `GET /users`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  ]
}
```

---

### 2. Get User by ID (Admin Only)
**Endpoint:** `GET /users/{id}`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 3. Create User (Admin Only)
**Endpoint:** `POST /users`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "user"
  },
  "message": "User created successfully"
}
```

---

### 4. Update User (Admin Only)
**Endpoint:** `PUT /users/{id}`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "role": "admin"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "admin"
  },
  "message": "User updated successfully"
}
```

---

### 5. Delete User (Admin Only)
**Endpoint:** `DELETE /users/{id}`

**Headers:**
- `Authorization: Bearer <token>`
- User must have `ROLE_ADMIN`

**Response (204 No Content)**

---

## Cart Endpoints

### 1. Get Current User's Cart
**Endpoint:** `GET /cart/current`

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-1",
    "userId": 1,
    "items": [
      {
        "product": {
          "id": "prod-1",
          "name": "Wireless Headphones",
          "price": 99.99,
          "image": "/images/headphones.jpg"
        },
        "quantity": 2
      }
    ],
    "total": 199.98,
    "itemCount": 2
  }
}
```

---

### 2. Add Item to Cart
**Endpoint:** `POST /cart/add`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "prod-1",
  "quantity": 2
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-1",
    "userId": 1,
    "items": [...],
    "total": 199.98,
    "itemCount": 2
  },
  "message": "Item added to cart successfully"
}
```

---

### 3. Update Cart Item
**Endpoint:** `POST /cart/update`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "prod-1",
  "quantity": 3
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-1",
    "userId": 1,
    "items": [...],
    "total": 299.97,
    "itemCount": 3
  },
  "message": "Cart item updated successfully"
}
```

---

### 4. Remove Item from Cart
**Endpoint:** `DELETE /cart/items/{productId}`

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-1",
    "userId": 1,
    "items": [],
    "total": 0,
    "itemCount": 0
  },
  "message": "Item removed from cart successfully"
}
```

---

### 5. Clear Cart
**Endpoint:** `DELETE /cart/clear`

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-1",
    "userId": 1,
    "items": [],
    "total": 0,
    "itemCount": 0
  },
  "message": "Cart cleared successfully"
}
```

---

## Common Response Formats

### Success Response
```json
{
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "errors": ["Error message 1", "Error message 2"],
  "message": "Operation failed"
}
```

### Validation Error Response
```json
{
  "errors": {
    "email": ["Email is required", "Email must be valid"],
    "password": ["Password must be at least 8 characters"]
  },
  "message": "Validation failed"
}
```

---

## Authentication & Authorization

### Headers
All authenticated endpoints require:
```
Authorization: Bearer <jwt_token>
```

### Roles
- `ROLE_USER`: Regular user access
- `ROLE_ADMIN`: Administrator access (required for admin endpoints)

### Token Management
- Tokens are returned in the `data.token` field on login/register
- Tokens should be stored securely (httpOnly cookies recommended)
- Tokens expire after 7 days
- Use `/auth/refresh-token` to refresh expired tokens

---

## HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `204 No Content`: Request successful, no content to return
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or token invalid
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate email)
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error

---

## Notes for Backend Team

1. **CORS**: Enable CORS for the frontend domain
2. **Rate Limiting**: Implement rate limiting on authentication endpoints
3. **Pagination**: Default pagination should be 10 items per page
4. **Search**: Search should be case-insensitive and match partial strings
5. **Timestamps**: All timestamps should be in ISO 8601 format (UTC)
6. **IDs**: Product and order IDs can be strings or numbers
7. **Image URLs**: Return full URLs or relative paths that the frontend can resolve
8. **Validation**: Validate all input data and return detailed error messages
9. **Token Expiry**: JWT tokens should expire after 7 days
10. **Admin Middleware**: Protect admin endpoints with role-based middleware

---

## Summary

**Total Endpoints: 28**

- Authentication: 5 endpoints
- Products: 5 endpoints
- Orders: 5 endpoints
- Users: 5 endpoints
- Cart: 5 endpoints

All endpoints follow RESTful conventions and return consistent JSON responses.
