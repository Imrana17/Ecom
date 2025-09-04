import apiClient from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface RegisterResponse {
  message: string;
  role: string;
  email: string;
}

export interface ProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  role: string;
}

export const authAPI = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post('/customers', data);
    return response.data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};