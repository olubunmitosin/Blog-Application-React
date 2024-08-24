import { configureStore } from "@reduxjs/toolkit";
import { postAPI } from "./api/postAPI";
import { userAPI } from "./api/userAPI";

export const store = configureStore({
  reducer: {
    [postAPI.reducerPath]: postAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([postAPI.middleware, userAPI.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
