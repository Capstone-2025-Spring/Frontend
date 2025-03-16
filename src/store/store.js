import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootReducer, rootSaga } from "../module";

const sagaMiddleware = createSagaMiddleware();

//리듀서(Slices들)와 미들웨어(여러가지Saga들)을 저장해놓는 Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
