import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import historyReducer from './historySlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        history: historyReducer,
    },
});