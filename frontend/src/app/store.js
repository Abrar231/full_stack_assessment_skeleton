import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit'
import { apiSlice } from '../slices/apiSlice';
import selectedUserReducer from '../slices/selectedUserSlice'

export const store = configureStore({
    reducer: {
        'selectedUser': selectedUserReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
      .prepend(createListenerMiddleware().middleware)
      .concat(apiSlice.middleware)
});