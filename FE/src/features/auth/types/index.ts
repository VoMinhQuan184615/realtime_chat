export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
