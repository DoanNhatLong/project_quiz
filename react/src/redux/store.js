import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import historyReducer from './historySlice';
import quizReducer from './quizSlice';
import examEditorReducer from './examEditorSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        history: historyReducer,
        quizzes: quizReducer,
        examEditor: examEditorReducer,
    },
});