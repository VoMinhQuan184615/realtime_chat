import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import {
  loginRequest,
  logoutRequest,
  signupRequest,
  clearError,
} from "@/features/auth/redux/authSlice";
import { LoginCredentials, SignupCredentials } from "@/types/auth";

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export function useAppSelector<T>(selector: (state: RootState) => T) {
  return useSelector(selector);
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const login = (credentials: LoginCredentials) => {
    dispatch(loginRequest(credentials));
  };

  const signup = (credentials: SignupCredentials) => {
    dispatch(signupRequest(credentials));
  };

  const logout = () => {
    dispatch(logoutRequest());
  };

  const clearLoginError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
    clearLoginError,
  };
}
