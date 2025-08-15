import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string;  // NOT null
  email: string;     // NOT null
  userId: string;    // NOT null
  isAuthenticated: boolean;
  loading: boolean;
  errorMessage: string;
  showRenewDialog: boolean;
}

// NEVER use null/undefined
const initialState: AuthState = {
  username: '',
  email: '',
  userId: '',
  isAuthenticated: false,
  loading: false,
  errorMessage: '',
  showRenewDialog: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username || '';
      state.email = action.payload.email || '';
      state.userId = action.payload.userId || '';
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.username = '';
      state.email = '';
      state.userId = '';
      state.isAuthenticated = false;
      state.loading = false;
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('access_token');
      }
    },
    showRenewDialog: (state) => {
      state.showRenewDialog = true;
    },
    hideRenewDialog: (state) => {
      state.showRenewDialog = false;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload || '';
    },
  },
});

export const { setUser, logout, showRenewDialog, hideRenewDialog, setErrorMessage } = authSlice.actions;
export default authSlice.reducer;

// Safe selectors
export const selectAuth = (state: any) => state?.auth || initialState;
export const selectIsAuthenticated = (state: any) => state?.auth?.isAuthenticated || false;
