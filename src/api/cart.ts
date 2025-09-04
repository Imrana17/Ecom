import apiClient from './client';

export interface AddToCartRequest {
  item_id: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  item_id: number;
  item_name: string;
  quantity: number;
  unit_price: number;
  total: number;
  image_url: string;
}

export interface CartResponse {
  items: CartItem[];
  summary: {
    item_count: number;
    subtotal: number;
  };
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface CartMessage {
  message: string;
}

export const cartAPI = {
  addToCart: async (data: AddToCartRequest): Promise<CartMessage> => {
    const response = await apiClient.post('/cart', data);
    return response.data;
  },

  getCart: async (): Promise<CartResponse> => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  updateCartItem: async (itemId: number, data: UpdateCartItemRequest): Promise<CartMessage> => {
    const response = await apiClient.put(`/cart/${itemId}`, data);
    return response.data;
  },

  removeCartItem: async (itemId: number): Promise<CartMessage> => {
    const response = await apiClient.delete(`/cart/${itemId}`);
    return response.data;
  },

  clearCart: async (): Promise<CartMessage> => {
    const response = await apiClient.delete('/cart/clear');
    return response.data;
  },
};