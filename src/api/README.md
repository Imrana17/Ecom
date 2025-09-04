# Restaurant API Client

This directory contains the TypeScript client implementation for the restaurant API operations.

## Overview

The API client is organized into separate modules for different functional areas:

- **auth.ts** - Authentication operations (login, register, profile)
- **menu.ts** - Menu operations (categories, menu items)
- **cart.ts** - Shopping cart operations (add, update, remove, clear)
- **orders.ts** - Order operations (place order, get orders)
- **delivery.ts** - Delivery company operations
- **payments.ts** - Payment operations (initiate, status)
- **password.ts** - Password management (change, reset)
- **client.ts** - Base axios client configuration
- **index.ts** - Exports all API modules

## Configuration

The base API URL is configured in `client.ts`:
- Default: `http://localhost/restaurant/api/`
- Can be overridden with `REACT_APP_API_URL` environment variable

## Authentication

The client automatically handles JWT tokens:
- Tokens are stored in localStorage with key 'token'
- Authorization header is automatically added to requests
- 401 responses trigger automatic logout

## Usage Examples

### Basic Authentication Flow
```typescript
import { authAPI } from '@/api';

// Register
const registerResponse = await authAPI.register({
  first_name: "John",
  last_name: "Doe", 
  email: "john@example.com",
  password: "password123",
  phone: "123-456-7890"
});

// Login
const loginResponse = await authAPI.login({
  email: "john@example.com",
  password: "password123"
});

// Store token
localStorage.setItem('token', loginResponse.accessToken);

// Get profile
const profile = await authAPI.getProfile();
```

### Menu Operations
```typescript
import { menuAPI } from '@/api';

// Get categories
const categories = await menuAPI.getCategories();

// Get all menu items
const allItems = await menuAPI.getMenuItems();

// Get items by category
const categoryItems = await menuAPI.getMenuItems({ category_id: 1 });

// Get featured items
const featured = await menuAPI.getFeaturedItems();
```

### Cart Operations
```typescript
import { cartAPI } from '@/api';

// Add to cart
await cartAPI.addToCart({
  item_id: 1,
  quantity: 2
});

// Get cart
const cart = await cartAPI.getCart();

// Update quantity
await cartAPI.updateCartItem(1, { quantity: 3 });

// Remove item
await cartAPI.removeCartItem(1);

// Clear cart
await cartAPI.clearCart();
```

### Order Operations
```typescript
import { ordersAPI } from '@/api';

// Place order
const order = await ordersAPI.placeOrder({
  special_instructions: "Extra sauce please"
});

// Get order history
const orders = await ordersAPI.getOrders();
```

### Payment Operations
```typescript
import { paymentsAPI } from '@/api';

// Initiate payment
const payment = await paymentsAPI.initiatePayment({
  order_id: 1
});

// Get payment status
const status = await paymentsAPI.getPaymentStatus(userId);
```

### Password Management
```typescript
import { passwordAPI } from '@/api';

// Change password
await passwordAPI.changePassword({
  current_password: "old",
  new_password: "new"
});

// Request password reset
const reset = await passwordAPI.requestPasswordReset({
  email: "user@example.com"
});

// Verify reset token
const valid = await passwordAPI.verifyResetToken({
  token: "reset-token"
});

// Reset password
await passwordAPI.resetPassword({
  token: "reset-token",
  password: "newpassword"
});
```

## Error Handling

All API calls return promises and should be wrapped in try/catch blocks:

```typescript
try {
  const result = await authAPI.login(credentials);
  // Handle success
} catch (error) {
  // Handle error
  console.error('Login failed:', error);
}
```

## Type Safety

All API operations are fully typed with TypeScript interfaces for:
- Request parameters
- Response data
- Error responses

See the individual API module files for complete type definitions.