import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string | null;
    email: string | null;
    loading: boolean;
}

const initialState: UserState = {
    username: null,
    email: null,
    loading: false,
};

export const restoreUserSession = createAsyncThunk(
    'auth/restoreUserSession',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('access_token');
            if (!token) throw new Error('No token found');

           const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/userSession`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Session invalid');
            }

            const data = await response.json();
            return data; // { username, email }
        } catch (error) {
            return thunkAPI.rejectWithValue('Session expired');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.username = null;
            state.email = null;
            sessionStorage.removeItem('access_token');
        },
        setUser: (state, action: PayloadAction<{ username: string; email: string }>) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(restoreUserSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(restoreUserSession.fulfilled, (state, action: PayloadAction<{ username: string; email: string }>) => {
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.loading = false;
            })
            .addCase(restoreUserSession.rejected, (state) => {
                state.loading = false;
                state.username = null;
                state.email = null;
                sessionStorage.removeItem('access_token');
            });
    },
});

export const { logout, setUser } = authSlice.actions; 
export default authSlice.reducer;
