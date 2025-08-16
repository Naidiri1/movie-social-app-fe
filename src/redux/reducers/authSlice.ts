import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  email: string | null;
  loading: boolean;
  userId: string | null;
}

const initialState: UserState = {
  username: null,
  email: null,
  loading: false,
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.email = null;
      sessionStorage.removeItem("access_token");
      state.userId = "";
    },

    setUser: (
      state,
      action: PayloadAction<{ username: string; email: string; userId: string }>
    ) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;