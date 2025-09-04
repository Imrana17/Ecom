import apiClient from './client';

export interface InitiatePaymentRequest {
  order_id: number;
}

export interface InitiatePaymentResponse {
  message: string;
  payment_reference: string;
  amount: number;
  order_id: number;
}

export interface PaymentStatus {
  id: number;
  order_number: string;
  amount: number;
  status: string;
  created_at: string;
  provider_reference: string;
}

export const paymentsAPI = {
  initiatePayment: async (data: InitiatePaymentRequest): Promise<InitiatePaymentResponse> => {
    const response = await apiClient.post('/payments/initiate', data);
    return response.data;
  },

  getPaymentStatus: async (userId: number): Promise<PaymentStatus[]> => {
    const response = await apiClient.get(`/payments/status/${userId}`);
    return response.data;
  },
};