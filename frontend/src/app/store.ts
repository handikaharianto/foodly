import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "./reducers";

const otherMiddlewares: any = [];
if (process.env.NODE_ENV === "development") {
  otherMiddlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(otherMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
