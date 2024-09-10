import { createSlice } from "@reduxjs/toolkit";

export const selectedUserSlice = createSlice({
    name: 'selectedUser',
    initialState: {
        id: 0,
        username: 'None'
    },
    reducers: {
        changeSelectedUser: (state, action) => {
            return action.payload.user
        }
    },
    selectors: {
        selectSelectedUser: user => user
    }
});

export const { changeSelectedUser } = selectedUserSlice.actions;

export const { selectSelectedUser } = selectedUserSlice.selectors;

export default selectedUserSlice.reducer;