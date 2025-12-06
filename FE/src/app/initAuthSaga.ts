import { call, put } from "redux-saga/effects";
import { restoreSession } from "@/features/auth/redux/authSlice";
import { getToken } from "@/utils";
import { decodeToken } from "@/lib/utils";

/**
 * Initialize auth state from localStorage
 * Runs on app start to restore user session if token exists
 */
export function* initAuthSaga() {
  try {
    const token: string | null = yield call(getToken);

    if (token) {
      // Decode token to get user info
      const decoded: any = yield call(decodeToken, token);

      if (decoded) {
        const user = {
          id: decoded.id || decoded.userId || "unknown",
          email: decoded.email || "unknown@example.com",
          name: decoded.username || decoded.name || "User",
        };

        yield put(restoreSession(user));
      }
    }
  } catch (error) {
    // Silently fail - user will see login page
  }
}
