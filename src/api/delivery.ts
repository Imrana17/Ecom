import apiClient from './client';

export interface DeliveryCompany {
  id: number;
  name: string;
  email: string;
  phone: string;
  contact_person: string;
  is_active: number;
}

export const deliveryAPI = {
  getDeliveryCompanies: async (): Promise<DeliveryCompany[]> => {
    const response = await apiClient.get('/delivery-companies');
    return response.data;
  },
};