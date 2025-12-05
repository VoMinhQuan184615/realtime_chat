import apiClient from "@/api/apiClient";
import {
  LoginCredentials,
  AuthResponse,
  SignupCredentials,
  SignupResponse,
} from "@/types/auth";
import { AxiosError } from "axios";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{
        success: boolean;
        message: string;
      }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Login failed";
      throw new Error(errorMessage);
    }
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const { data } = await apiClient.post<{ message: string }>(
        "/auth/forgot-password",
        { email }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{
        success: boolean;
        message: string;
      }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Failed to send reset link";
      throw new Error(errorMessage);
    }
  },

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      const { data } = await apiClient.post<{ message: string }>(
        "/auth/reset-password",
        { token, newPassword }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{
        success: boolean;
        message: string;
      }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Failed to reset password";
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },

  async signup(data: SignupCredentials): Promise<SignupResponse> {
    try {
      const { data: response } = await apiClient.post<SignupResponse>(
        "/auth/signup",
        data
      );
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{
        success: boolean;
        message: string;
      }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Signup failed";
      throw new Error(errorMessage);
    }
  },
};
