import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from 'react'
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

export const restoreUserSession = createAsyncThunk(
  "auth/restoreUserSession",
  async (_, thunkAPI) => {
    try {
      if (!token) console.error("No token found");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/userSession`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Session invalid");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => { setToken(sessionStorage.getItem("access_token")); }, []);
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
  extraReducers: (builder) => {
    builder
      .addCase(restoreUserSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        restoreUserSession.fulfilled,
        (
          state,
          action: PayloadAction<{
            username: string;
            email: string;
            userId: string;
          }>
        ) => {
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.userId = action.payload.userId;
          state.loading = false;
        }
      )
      .addCase(restoreUserSession.rejected, (state) => {
        state.loading = false;
        state.username = null;
        state.email = null;
        state.userId = "";
        sessionStorage.removeItem("access_token");
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
