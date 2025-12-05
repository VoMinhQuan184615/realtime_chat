import { fork } from "redux-saga/effects";
import { authSaga } from "@/features/auth/redux/authSaga";

export function* rootSaga() {
  yield fork(authSaga);
}
