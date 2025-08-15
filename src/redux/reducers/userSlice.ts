'use client';

// redux/userSlice.ts
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

interface User {
  
    userId: string | null;
    username: string | null;
    email: string | null;
}

const initialState: User = {
   
    userId: null,
    email: null,
    username: null,
};

export const fetchUser = createAsyncThunk(
    'auth/restoreUserSession',
    async (_, { rejectWithValue }) => {
        const requestOptions = {
            method: 'GET',
            handleAs: 'json',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '.concat(sessionStorage.access_token),
            },
        };

        try {
            const response = await fetch(
               `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/userSession`,
                requestOptions,
            );
            if (response.status === 200) {
                const data = await response.json();
                sessionStorage.setItem('token_expiration', data.exp);
                return data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchUser.fulfilled,
            (state, action: PayloadAction<User>) => {
                return action.payload;
            },
        );
    },
});

export const { updateUser } = userSlice.actions;

// Selectors
export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
