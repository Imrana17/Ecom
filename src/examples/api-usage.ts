// Example usage of the restaurant API
import { 
  authAPI, 
  menuAPI, 
  cartAPI, 
  ordersAPI, 
  deliveryAPI, 
  paymentsAPI, 
  passwordAPI 
} from '../api';

// Example: Complete customer journey
export const exampleCustomerJourney = async () => {
  try {
    // 1. Register new customer
    const registerData = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      phone: "123-456-7890"
    };
    
    console.log('1. Registering customer...');
    const registerResponse = await authAPI.register(registerData);
    console.log('Register response:', registerResponse);

    // 2. Login
    console.log('2. Logging in...');
    const loginResponse = await authAPI.login({
      email: "john.doe@example.com",
      password: "password123"
    });
    console.log('Login response:', loginResponse);
    
    // Store the token (normally done by interceptor)
    localStorage.setItem('token', loginResponse.accessToken);

    // 3. Get profile
    console.log('3. Getting profile...');
    const profile = await authAPI.getProfile();
    console.log('Profile:', profile);

    // 4. Browse menu
    console.log('4. Getting categories...');
    const categories = await menuAPI.getCategories();
    console.log('Categories:', categories);

    console.log('5. Getting menu items...');
    const menuItems = await menuAPI.getMenuItems();
    console.log('Menu items:', menuItems);

    // 6. Get featured items
    console.log('6. Getting featured items...');
    const featuredItems = await menuAPI.getFeaturedItems();
    console.log('Featured items:', featuredItems);

    // 7. Add items to cart
    if (menuItems.length > 0) {
      console.log('7. Adding item to cart...');
      const addToCartResponse = await cartAPI.addToCart({
        item_id: menuItems[0].id,
        quantity: 2
      });
      console.log('Add to cart response:', addToCartResponse);
    }

    // 8. Get cart
    console.log('8. Getting cart...');
    const cart = await cartAPI.getCart();
    console.log('Cart:', cart);

    // 9. Update cart item quantity
    if (cart.items.length > 0) {
      console.log('9. Updating cart item quantity...');
      const updateResponse = await cartAPI.updateCartItem(cart.items[0].item_id, {
        quantity: 3
      });
      console.log('Update cart response:', updateResponse);
    }

    // 10. Get delivery companies
    console.log('10. Getting delivery companies...');
    const deliveryCompanies = await deliveryAPI.getDeliveryCompanies();
    console.log('Delivery companies:', deliveryCompanies);

    // 11. Place order
    console.log('11. Placing order...');
    const orderResponse = await ordersAPI.placeOrder({
      special_instructions: "Please include extra napkins"
    });
    console.log('Order response:', orderResponse);

    // 12. Initiate payment
    console.log('12. Initiating payment...');
    const paymentResponse = await paymentsAPI.initiatePayment({
      order_id: orderResponse.order_id
    });
    console.log('Payment response:', paymentResponse);

    // 13. Get orders
    console.log('13. Getting order history...');
    const orders = await ordersAPI.getOrders();
    console.log('Orders:', orders);

    // 14. Get payment status
    console.log('14. Getting payment status...');
    const paymentStatus = await paymentsAPI.getPaymentStatus(profile.id);
    console.log('Payment status:', paymentStatus);

    // 15. Change password
    console.log('15. Changing password...');
    const changePasswordResponse = await passwordAPI.changePassword({
      current_password: "password123",
      new_password: "newpassword456"
    });
    console.log('Change password response:', changePasswordResponse);

  } catch (error) {
    console.error('Error in customer journey:', error);
  }
};

// Example: Password reset flow
export const examplePasswordReset = async () => {
  try {
    // Request password reset
    console.log('1. Requesting password reset...');
    const resetRequest = await passwordAPI.requestPasswordReset({
      email: "john.doe@example.com"
    });
    console.log('Reset request response:', resetRequest);

    // Verify token
    console.log('2. Verifying reset token...');
    const tokenVerification = await passwordAPI.verifyResetToken({
      token: resetRequest.reset_token
    });
    console.log('Token verification:', tokenVerification);

    // Reset password
    console.log('3. Resetting password...');
    const resetResponse = await passwordAPI.resetPassword({
      token: resetRequest.reset_token,
      password: "newpassword789"
    });
    console.log('Reset response:', resetResponse);

  } catch (error) {
    console.error('Error in password reset:', error);
  }
};

// Example: Cart management
export const exampleCartManagement = async () => {
  try {
    // Get menu items first
    const menuItems = await menuAPI.getMenuItems();
    
    if (menuItems.length > 0) {
      // Add multiple items to cart
      await cartAPI.addToCart({ item_id: menuItems[0].id, quantity: 1 });
      
      if (menuItems.length > 1) {
        await cartAPI.addToCart({ item_id: menuItems[1].id, quantity: 2 });
      }

      // Get cart
      const cart = await cartAPI.getCart();
      console.log('Cart after adding items:', cart);

      // Update first item quantity
      if (cart.items.length > 0) {
        await cartAPI.updateCartItem(cart.items[0].item_id, { quantity: 5 });
        console.log('Updated cart item quantity');
      }

      // Remove second item
      if (cart.items.length > 1) {
        await cartAPI.removeCartItem(cart.items[1].item_id);
        console.log('Removed cart item');
      }

      // Get updated cart
      const updatedCart = await cartAPI.getCart();
      console.log('Cart after updates:', updatedCart);

      // Clear entire cart
      await cartAPI.clearCart();
      console.log('Cleared entire cart');
    }

  } catch (error) {
    console.error('Error in cart management:', error);
  }
};