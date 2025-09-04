import apiClient from './client';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  sort_order: number;
  is_active: number;
}

export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  category_id: number;
  available: number;
  is_featured: number;
  category_name: string;
  image_url: string;
}

export interface MenuItemsParams {
  category_id?: number;
  featured?: boolean;
}

export const menuAPI = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  getMenuItems: async (params?: MenuItemsParams): Promise<MenuItem[]> => {
    const response = await apiClient.get('/menu-items', { params });
    return response.data;
  },

  getMenuItem: async (id: number): Promise<MenuItem> => {
    const response = await apiClient.get(`/menu-items/${id}`);
    return response.data;
  },

  getFeaturedItems: async (): Promise<MenuItem[]> => {
    const response = await apiClient.get('/menu-items', { params: { featured: true } });
    return response.data;
  },
};