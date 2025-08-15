
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';


interface UserState {
  username: string | null;
  email: string | null;
  userId: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  errorMessage: string | null;
}

const initialState: UserState = {
  username: null,
  email: null,
  userId: null,
  loading: false,
  isAuthenticated: false,
  errorMessage: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  setUser: (state, action: PayloadAction<{
      username: string;
      email: string;
      userId: string;
    }>) => {

      state.username = action.payload.username;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      state.loading = false;
      state.errorMessage = '';
    },
    
    logout: (state) => {
      state.username = null;
      state.email = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.loading = false;
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem("access_token");
      }
    },
    
    setLoading: (state, action: any) => {
      state.loading = action.payload;
    },
    
    setErrorMessage: (state, action: any) => {
      state.errorMessage = action.payload;
      state.loading = false;
    },
    
    clearError: (state) => {
      state.errorMessage = '';
    },
    
  },
    extraReducers: (builder) => {
    builder
      .addCase(restoreUserSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreUserSession.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
        state.loading = false;
        state.errorMessage = '';
      })
      .addCase(restoreUserSession.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.email = null;
        state.userId = null;
      });
  },
});


export const { 
  setUser, 
  logout, 
  setLoading, 
  setErrorMessage, 
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
export const selectUsername = (state: any) => state.auth.username;
export const selectUserId = (state: any) => state.auth.userId;
export const selectEmail = (state: any) => state.auth.email;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: any) => state.auth.loading;
export const selectAuthError = (state: any) => state.auth.errorMessage;

export const restoreUserSession = createAsyncThunk(
    'auth/restoreUserSession',
     async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem('access_token');
           const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/userSession`,
             {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

            if (!response.ok) {
               console.error('Session invalid');
            }

            const data = await response.json();
             sessionStorage.setItem('token_expiration', data.exp);
            return data; 
        } catch (error) {
             return rejectWithValue(error);
        }
    }
);