import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
  userId: string;
  username: string;
  email: string;
}

interface UserState extends User {
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userId: '',
  username: '',
  email: '',
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window === 'undefined') {
        return rejectWithValue('SSR');
      }
      
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        return rejectWithValue('No token');
      }
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/userSession`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      console.log('Fetched user data:', data); // Debug log
      
      return {
        userId: data.userId || '',
        username: data.username || '',
        email: data.email || '',
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.userId = action.payload.userId || state.userId;
      state.username = action.payload.username || state.username;
      state.email = action.payload.email || state.email;
    },
    clearUser: (state) => {
      state.userId = '';
      state.username = '';
      state.email = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userId = action.payload.userId || '';
        state.username = action.payload.username || '';
        state.email = action.payload.email || '';
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userId = '';
        state.username = '';
        state.email = '';
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch user';
      });
  },
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;