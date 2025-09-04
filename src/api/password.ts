import apiClient from './client';

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  reset_token: string;
  reset_link: string;
}

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface PasswordMessage {
  message: string;
}

export const passwordAPI = {
  changePassword: async (data: ChangePasswordRequest): Promise<PasswordMessage> => {
    const response = await apiClient.post('/password/change', data);
    return response.data;
  },

  requestPasswordReset: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post('/password/reset-request', data);
    return response.data;
  },

  verifyResetToken: async (data: VerifyTokenRequest): Promise<VerifyTokenResponse> => {
    const response = await apiClient.post('/password/verify-token', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<PasswordMessage> => {
    const response = await apiClient.post('/password/reset', data);
    return response.data;
  },
};