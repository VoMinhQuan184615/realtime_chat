import { fork } from "redux-saga/effects";
import { authSaga } from "@/features/auth/redux/authSaga";
import { chatSaga } from "@/features/chat/redux/chatSaga";
import { initAuthSaga } from "@/app/initAuthSaga";

export function* rootSaga() {
  yield fork(initAuthSaga);
  yield fork(authSaga);
  yield fork(chatSaga);
}
