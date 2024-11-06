import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authToken: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.authToken = action.payload
        },
    },
});

export const {
    setAuthData
} = authSlice.actions;

export const selectApp = (state) => state.app;

export default authSlice.reducer;
