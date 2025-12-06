import apiClient from "@/api/apiClient";
import { API_CONFIG } from "@/config";

import { UserResponse } from "@/types/user";

export async function fetchUserProfile(): Promise<UserResponse> {
  try {
    const response = await apiClient.get<UserResponse>(
      API_CONFIG.ENDPOINTS.USER_PROFILE
    );
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch user profile:", error);
    throw error;
  }
}
