import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const getQuestionsByQuizId = async (quizId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/questions?quizId=${quizId}`);
        const allQuestions = response.data;

        const shuffled = allQuestions.sort(() => 0.5 - Math.random());

        return shuffled.slice(0, 10);
    } catch (error) {
        console.error("Lỗi khi lấy bộ câu hỏi:", error);
        return [];
    }
};