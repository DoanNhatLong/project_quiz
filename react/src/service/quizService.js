import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/quizzes";
const API_ATTEMPTS_URL = "http://localhost:8080/quiz-attempts";

export const getQuestionsForPlay = async (quizId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${quizId}/play`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API lấy câu hỏi bài thi:", error);
        throw error;
    }
};


export const submitQuizResult = async (submission) => {
    try {
        const response = await axios.post(
            `${API_ATTEMPTS_URL}/submit`,
            submission
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi nộp bài thi:", error);
        throw error;
    }
};