export interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  avatar?: string;
  avatarImage?: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface FormErrors {
  [key: string]: string;
}

export interface SignupCredentials {
  username: string;
  password: string;
  avatarImage?: string;
  email: string;
  phone: string;
  confirmPassword: string;
}

export interface SignupResponse {
  message: string;
}
