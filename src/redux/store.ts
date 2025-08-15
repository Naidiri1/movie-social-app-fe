import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authUserSlice from "../redux/reducers/authSlice";

const rootReducer = combineReducers({
  auth: authUserSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
