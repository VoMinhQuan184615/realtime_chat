import axios, { AxiosInstance, AxiosError } from "axios";
import { API_CONFIG } from "@/config";
import { getToken, removeToken } from "@/utils";

// Create axios instance with config from .env
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });

    // Only redirect on 401 if token exists (expired token)
    // Don't redirect on 401 from login endpoint (bad credentials)
    if (error.response?.status === 401) {
      const token = getToken();
      const isLoginEndpoint = error.config?.url?.includes("/auth/login");

      if (token && !isLoginEndpoint) {
        // Token expired or invalid - redirect to login
        removeToken();
        window.location.href = "/login";
      }
      // If no token or is login endpoint, let the component handle the error
    }

    // Improve error message
    if (error.message === "Network Error") {
      console.error(
        "Network error - Backend không response. Kiểm tra:",
        "1. Backend chạy trên",
        API_CONFIG.BASE_URL,
        "2. CORS headers trong backend"
      );
    }

    return Promise.reject(error);
  }
);

export default apiClient;
