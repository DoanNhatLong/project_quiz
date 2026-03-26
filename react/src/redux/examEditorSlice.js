import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    description: '',
    durationMinutes: 45,
    passScorePercentage: 0.8,
    selectedQuestions: []
};
const examEditorSlice = createSlice({
    name: 'examEditor',
    initialState,
    reducers: {
        updateExamInfo: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        addQuestion: (state, action) => {
            const question = action.payload;
            const isExist = state.selectedQuestions.some(q => q.id === question.id);
            if (!isExist) {
                state.selectedQuestions.push(question);
            }
        },
        removeQuestion: (state, action) => {
            const questionId = action.payload;
            state.selectedQuestions = state.selectedQuestions.filter(q => q.id !== questionId);
        },
        resetEditor: () => initialState
    }
});

export const { updateExamInfo, addQuestion, removeQuestion, resetEditor } = examEditorSlice.actions;
export default examEditorSlice.reducer;

