import apiClient from './client';

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  image: string;
  images?: string[];
  is_available: boolean;
  preparation_time?: number;
}

export const menuAPI = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  getMenuItems: async (categoryId?: string): Promise<MenuItem[]> => {
    const params = categoryId ? { category_id: categoryId } : {};
    const response = await apiClient.get('/menu-items', { params });
    return response.data;
  },

  getMenuItem: async (id: string): Promise<MenuItem> => {
    const response = await apiClient.get(`/menu-items/${id}`);
    return response.data;
  },

  getFeaturedItems: async (): Promise<MenuItem[]> => {
    const response = await apiClient.get('/menu-items/featured');
    return response.data;
  },
};