import { call, put, takeEvery } from "redux-saga/effects";
import { authService } from "@/services";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  signupRequest,
  signupSuccess,
  signupFailure,
} from "@/features/auth/redux/authSlice";
import { LoginCredentials, SignupCredentials } from "@/types/auth";

// Login Saga - Xử lý async login logic
function* handleLogin(action: { payload: LoginCredentials }) {
  try {
    // Gọi authService (có business logic + token save)
    const response = yield call(authService.login, action.payload);

    // Update Redux state
    yield put(loginSuccess(response));

    // Socket connection will be triggered by auth state change
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Login failed";
    yield put(loginFailure(errorMessage));
  }
}

// Logout Saga - Xử lý logout logic
function* handleLogout() {
  try {
    // Gọi authService (clear token)
    yield call(authService.logout);

    // Update Redux state
    yield put(logoutSuccess());

    // Socket will be disconnected by useSocketConnection hook when auth state changes
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Logout failed";
    yield put(logoutSuccess()); // Still clear state even if logout request fails
  }
}

// Signup Saga - Xử lý async signup logic
function* handleSignup(action: { payload: SignupCredentials }) {
  try {
    // Gọi authService (call API, no token saved for signup)
    const response = yield call(authService.signup, action.payload);

    // Update Redux state
    yield put(signupSuccess(response));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Signup failed";
    yield put(signupFailure(errorMessage));
  }
}

// Root Saga - Xác định action nào bắt
export function* authSaga() {
  yield takeEvery(loginRequest, handleLogin);
  yield takeEvery(logoutRequest, handleLogout);
  yield takeEvery(signupRequest, handleSignup);
}
