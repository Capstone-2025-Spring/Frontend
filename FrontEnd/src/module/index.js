import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";
import counterReducer from "./slice/counter_slice";
import { counterSaga } from "./saga/counter_saga";

//리듀서와 사가를 모두 합침.
export const rootReducer = combineReducers({
  counter: counterReducer,
});

export function* rootSaga() {
  yield all([counterSaga()]);
}
