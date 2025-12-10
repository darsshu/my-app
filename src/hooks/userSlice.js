// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: null,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },
        clearUser: (state) => {
            state.data = null;
            state.error = null;
        },
    },

});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;