import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, LoginCredentials, SignupCredentials } from "@/types/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  successMessage: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login actions
    loginRequest: (state, action: PayloadAction<LoginCredentials>) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("authToken", action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Logout actions
    logoutRequest: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("authToken");
    },

    // Signup actions
    signupRequest: (state, action: PayloadAction<SignupCredentials>) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.error = null;
      state.successMessage = "Account created successfully! Please log in.";
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    clearSuccess: (state) => {
      state.successMessage = null;
    },

    // Restore session
    restoreSession: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  signupRequest,
  signupSuccess,
  signupFailure,
  clearError,
  clearSuccess,
  restoreSession,
} = authSlice.actions;

export default authSlice.reducer;
