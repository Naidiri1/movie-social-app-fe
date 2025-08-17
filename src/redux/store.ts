import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authUserSlice from "../redux/reducers/authSlice";
import userSlice from "../redux/reducers/userSlice"
const rootReducer = combineReducers({
  auth: authUserSlice,
   user: userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
