import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/quizzes";

export const getQuestionsForPlay = async (quizId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${quizId}/play`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API lấy câu hỏi bài thi:", error);
        throw error;
    }
};


export const submitQuizResult = async (resultData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/submit`, resultData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi nộp bài thi:", error);
        throw error;
    }
};