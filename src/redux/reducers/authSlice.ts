import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    showDialog: false,
    errorMessage: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        showRenewDialog(state) {
            state.showDialog = true;
        },
        hideRenewDialog(state) {
            state.showDialog = false;
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload;
        },
    },
});

export const { showRenewDialog, hideRenewDialog, setErrorMessage } =
    authSlice.actions;
export default authSlice.reducer;
