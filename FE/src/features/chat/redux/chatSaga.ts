import { call, put, takeLatest } from "redux-saga/effects";
import { getOnlineUsersList } from "@/api/publicChatApi";
import { fetchOnlineUsersSuccess, fetchOnlineUsersError } from "./chatSlice";

// Worker saga
function* fetchOnlineUsersSaga(): Generator<any, void, any> {
  try {
    const data: any = yield call(getOnlineUsersList);
    yield put(fetchOnlineUsersSuccess(data.users || []));
  } catch (error: any) {
    yield put(
      fetchOnlineUsersError(error?.message || "Failed to fetch online users")
    );
  }
}

// Watcher saga
export function* chatSaga(): Generator<any, void, any> {
  yield takeLatest("chat/fetchOnlineUsersStart", fetchOnlineUsersSaga);
}
