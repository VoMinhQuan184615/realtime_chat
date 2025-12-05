import { authApi } from "@/api/authApi";
import {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  SignupResponse,
} from "@/types/auth";
import { saveToken, removeToken } from "@/utils";

/**
 * Auth Service - Xử lý logic authentication
 */
export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.login(credentials);
      if (response.token) {
        saveToken(response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await authApi.logout();
      removeToken();
    } catch (error) {
      // Still clear token even if API fails
      removeToken();
      throw error;
    }
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    try {
      const response = await authApi.forgotPassword(email);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      const response = await authApi.resetPassword(token, newPassword);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async signup(credentials: SignupCredentials): Promise<SignupResponse> {
    try {
      const response = await authApi.signup(credentials);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
