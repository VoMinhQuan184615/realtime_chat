import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Decode JWT token and extract user information
 * @param token - JWT token string
 * @returns Decoded payload with user info or null if invalid
 */
export function decodeToken(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

/**
 * Get current user from token stored in localStorage
 * @returns User object with id, username, email, or null
 */
export function getCurrentUserFromToken() {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const decoded = decodeToken(token);
    if (!decoded) return null;

    // Try to get username from various possible field names
    const username =
      decoded.username ||
      decoded.name ||
      decoded.fullName ||
      decoded.user?.username ||
      null;

    return {
      id: decoded.id || decoded.userId || "unknown",
      username: username, // Return null if not found, don't fallback to "Anonymous"
      email: decoded.email || "unknown@example.com",
      avatar: decoded.avatar,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get stored auth token
 * @returns Token string or null
 */
export function getToken() {
  return localStorage.getItem("authToken");
}

/**
 * Save auth token
 * @param token - JWT token string
 */
export function setToken(token) {
  localStorage.setItem("authToken", token);
}

/**
 * Remove auth token
 */
export function removeToken() {
  localStorage.removeItem("authToken");
}
