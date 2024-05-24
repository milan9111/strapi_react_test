import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthSlice";
import DialogsReducer from "./reducers/DialogsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    dialogs: DialogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;