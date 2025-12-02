export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface FormErrors {
  [key: string]: string;
}
