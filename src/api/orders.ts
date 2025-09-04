import apiClient from './client';

export interface PlaceOrderRequest {
  special_instructions?: string;
}

export interface PlaceOrderResponse {
  message: string;
  order_id: number;
  order_number: string;
  total: number;
}

export interface Order {
  id: number;
  order_number: string;
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total: number;
  status: string;
  placed_at: string;
}

export const ordersAPI = {
  placeOrder: async (data?: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
    const response = await apiClient.post('/orders', data || {});
    return response.data;
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  getOrder: async (orderId: number): Promise<Order> => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },
};