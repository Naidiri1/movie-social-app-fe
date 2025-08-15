
// redux/userSlice.ts
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

interface User {

    userId: string;
    username: string;
    email: string;
}

const initialState: User = {
   
  userId: '',
  username: '',
  email: '',
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
      
      const data = await response.json();
      return {
        userId: data.userId || '',
        username: data.username || '',
        email: data.email || '',
      };
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userId = action.payload.userId || '';
      state.username = action.payload.username || '';
      state.email = action.payload.email || '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userId = action.payload.userId || '';
        state.username = action.payload.username || '';
        state.email = action.payload.email || '';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userId = '';
        state.username = '';
        state.email = '';
      });
  },
});

export const { updateUser } = userSlice.actions;

// Selectors
export const selectUser = (state: any) => state?.user || initialState;

export default userSlice.reducer;
