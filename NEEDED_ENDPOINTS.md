# Needed Endpoints

This document lists potential endpoints that may be needed for a complete e-commerce application but are not currently implemented in the backend API.

## 1. File Service Endpoints

The File Service is currently internal and not fully exposed through the gateway. You may need to add:

### 1.1 Public File Access

**Current:** `GET /uploads/{filename}` (available through gateway)  
**Status:** ✅ Implemented

### 1.2 Upload File via Gateway

**Proposed:** `POST /api/v1/files/upload`  
**Status:** ❌ Not exposed (only internal)  
**Description:** Allow file uploads through the gateway for admin/user profile images  
**Request:** `multipart/form-data` with `file` field  
**Response:**

```json
{
  "success": true,
  "code": 200,
  "message": "File uploaded successfully",
  "data": {
    "path": "uploads/1638345600000_image.jpg",
    "url": "http://localhost:8080/uploads/1638345600000_image.jpg"
  }
}
```

### 1.3 Delete File via Gateway

**Proposed:** `DELETE /api/v1/files`  
**Status:** ❌ Not exposed (only internal)  
**Description:** Allow file deletion through the gateway  
**Request Body:**

```json
{
  "path": "uploads/1638345600000_image.jpg"
}
```

---

## 2. User Profile Management

### 2.1 Update Current User Profile

**Proposed:** `PUT /api/v1/auth/profile`  
**Status:** ❌ Not implemented  
**Description:** Allow users to update their own profile (name, email)  
**Request Body:**

```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com"
}
```

### 2.2 Change Password

**Proposed:** `POST /api/v1/auth/change-password`  
**Status:** ❌ Not implemented  
**Description:** Allow users to change their password  
**Request Body:**

```json
{
  "currentPassword": "oldpass123",
  "newPassword": "newpass456"
}
```

### 2.3 Forgot Password

**Proposed:** `POST /api/v1/auth/forgot-password`  
**Status:** ❌ Not implemented  
**Description:** Initiate password reset process  
**Request Body:**

```json
{
  "email": "user@example.com"
}
```

### 2.4 Reset Password

**Proposed:** `POST /api/v1/auth/reset-password`  
**Status:** ❌ Not implemented  
**Description:** Complete password reset with token  
**Request Body:**

```json
{
  "token": "reset-token-from-email",
  "newPassword": "newpass456"
}
```

---

## 3. Product Features

### 3.1 Product Reviews

**Proposed:** `POST /api/v1/products/{id}/reviews`  
**Status:** ❌ Not implemented  
**Description:** Add a review for a product  
**Request Body:**

```json
{
  "rating": 4.5,
  "comment": "Great product!",
  "userId": 1
}
```

### 3.2 Get Product Reviews

**Proposed:** `GET /api/v1/products/{id}/reviews`  
**Status:** ❌ Not implemented  
**Description:** Get all reviews for a product

### 3.3 Product Wishlist

**Proposed:** `POST /api/v1/wishlist/add`  
**Status:** ❌ Not implemented  
**Description:** Add product to user's wishlist  
**Request Body:**

```json
{
  "userId": 1,
  "productId": 5
}
```

### 3.4 Get User Wishlist

**Proposed:** `GET /api/v1/wishlist?userId=1`  
**Status:** ❌ Not implemented

### 3.5 Product Stock Alerts

**Proposed:** `POST /api/v1/products/{id}/stock-alert`  
**Status:** ❌ Not implemented  
**Description:** Subscribe to stock availability notifications

---

## 4. Order Features

### 4.1 Order Tracking

**Proposed:** `GET /api/v1/orders/{id}/tracking`  
**Status:** ❌ Not implemented  
**Description:** Get detailed tracking information for an order

### 4.2 Order History with Filters

**Proposed:** `GET /api/v1/orders/customer/{customerId}?status=DELIVERED&startDate=2024-01-01&endDate=2024-12-31`  
**Status:** ⚠️ Partially implemented (no date filtering)  
**Description:** Filter customer orders by status and date range

### 4.3 Return/Refund Request

**Proposed:** `POST /api/v1/orders/{id}/return`  
**Status:** ❌ Not implemented  
**Description:** Request a return or refund for an order  
**Request Body:**

```json
{
  "reason": "Product damaged",
  "items": [{ "productId": 1, "quantity": 1 }]
}
```

### 4.4 Invoice Generation

**Proposed:** `GET /api/v1/orders/{id}/invoice`  
**Status:** ❌ Not implemented  
**Description:** Generate and download invoice PDF

---

## 5. Payment Integration

### 5.1 Create Payment Intent

**Proposed:** `POST /api/v1/payments/intent`  
**Status:** ❌ Not implemented  
**Description:** Create payment intent for checkout (Stripe, PayPal, etc.)  
**Request Body:**

```json
{
  "orderId": 1,
  "amount": 1999.98,
  "currency": "USD",
  "paymentMethod": "stripe"
}
```

### 5.2 Payment Confirmation

**Proposed:** `POST /api/v1/payments/confirm`  
**Status:** ❌ Not implemented  
**Description:** Confirm payment completion  
**Request Body:**

```json
{
  "orderId": 1,
  "paymentIntentId": "pi_123456",
  "status": "succeeded"
}
```

### 5.3 Payment History

**Proposed:** `GET /api/v1/payments/history?userId=1`  
**Status:** ❌ Not implemented  
**Description:** Get user's payment history

---

## 6. Shipping & Address Management

### 6.1 Save Address

**Proposed:** `POST /api/v1/addresses`  
**Status:** ❌ Not implemented  
**Description:** Save a shipping address for later use  
**Request Body:**

```json
{
  "userId": 1,
  "fullName": "John Doe",
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "isDefault": true
}
```

### 6.2 Get User Addresses

**Proposed:** `GET /api/v1/addresses?userId=1`  
**Status:** ❌ Not implemented

### 6.3 Calculate Shipping Cost

**Proposed:** `POST /api/v1/shipping/calculate`  
**Status:** ❌ Not implemented  
**Description:** Calculate shipping cost based on address and cart items

---

## 7. Analytics & Reporting (Admin)

### 7.1 Sales Dashboard

**Proposed:** `GET /api/v1/admin/analytics/sales?period=monthly`  
**Status:** ❌ Not implemented  
**Description:** Get sales statistics and trends

### 7.2 Popular Products

**Proposed:** `GET /api/v1/admin/analytics/products/popular`  
**Status:** ❌ Not implemented  
**Description:** Get most popular/sold products

### 7.3 Customer Statistics

**Proposed:** `GET /api/v1/admin/analytics/customers`  
**Status:** ❌ Not implemented  
**Description:** Get customer statistics and demographics

### 7.4 Inventory Alerts

**Proposed:** `GET /api/v1/admin/inventory/alerts`  
**Status:** ❌ Not implemented  
**Description:** Get low stock alerts

---

## 8. Notifications

### 8.1 Email Notifications

**Proposed:** `POST /api/v1/notifications/email`  
**Status:** ❌ Not implemented  
**Description:** Send email notifications for order updates, promotions, etc.

### 8.2 Get User Notifications

**Proposed:** `GET /api/v1/notifications?userId=1`  
**Status:** ❌ Not implemented  
**Description:** Get user's notification history

### 8.3 Mark Notification as Read

**Proposed:** `PATCH /api/v1/notifications/{id}/read`  
**Status:** ❌ Not implemented

---

## 9. Promotions & Discounts

### 9.1 Apply Coupon Code

**Proposed:** `POST /api/v1/coupons/validate`  
**Status:** ❌ Not implemented  
**Description:** Validate and apply coupon code to cart  
**Request Body:**

```json
{
  "code": "SAVE20",
  "userId": 1,
  "cartTotal": 1999.98
}
```

### 9.2 Get Active Promotions

**Proposed:** `GET /api/v1/promotions/active`  
**Status:** ❌ Not implemented  
**Description:** Get currently active promotions and deals

### 9.3 Create Coupon (Admin)

**Proposed:** `POST /api/v1/admin/coupons`  
**Status:** ❌ Not implemented  
**Description:** Create new coupon codes

---

## 10. Search & Filters

### 10.1 Advanced Product Search

**Proposed:** `POST /api/v1/products/search/advanced`  
**Status:** ⚠️ Basic search exists  
**Description:** Advanced search with multiple filters  
**Request Body:**

```json
{
  "query": "laptop",
  "category": "Electronics",
  "priceRange": {
    "min": 500,
    "max": 2000
  },
  "rating": 4.0,
  "inStock": true,
  "sortBy": "price_asc"
}
```

### 10.2 Get Product Categories

**Proposed:** `GET /api/v1/products/categories`  
**Status:** ❌ Not implemented  
**Description:** Get list of all product categories with counts

### 10.3 Autocomplete Search

**Proposed:** `GET /api/v1/products/autocomplete?q=lap`  
**Status:** ❌ Not implemented  
**Description:** Get search suggestions for autocomplete

---

## Implementation Priority

### High Priority (Core Features)

1. ✅ Basic CRUD operations (Implemented)
2. ⚠️ User profile management (Needed)
3. ⚠️ Password reset functionality (Needed)
4. ⚠️ Payment integration (Critical for production)

### Medium Priority (Enhanced Features)

1. Product reviews and ratings
2. Wishlist functionality
3. Advanced search and filters
4. Shipping calculation
5. Order tracking

### Low Priority (Nice to Have)

1. Analytics and reporting
2. Notification system
3. Coupon system
4. Stock alerts
5. Invoice generation

---

## Notes

- All endpoints should follow the same response format as documented in `API_DOCUMENTATION_V2.md`
- All endpoints require JWT authentication unless specified as public
- Admin-only endpoints should check for `ROLE_ADMIN` authorization
- Consider rate limiting for public endpoints
- Implement proper error handling and validation for all endpoints
- Follow RESTful conventions and HTTP status codes

---

## Integration Guidelines

When implementing these endpoints:

1. **Maintain Consistency:** Use the same response structure as existing endpoints
2. **Security:** Always validate input and check authorization
3. **Documentation:** Update API documentation when adding new endpoints
4. **Testing:** Create comprehensive tests for new endpoints
5. **Versioning:** Use `/api/v1/` prefix for all API endpoints
6. **Gateway:** Ensure new endpoints are properly routed through the API Gateway (port 8080)
