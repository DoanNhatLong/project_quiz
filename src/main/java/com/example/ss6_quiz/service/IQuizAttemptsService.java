package com.example.ss6_quiz.service;

import com.example.ss6_quiz.entity.QuizAttempts;

import java.util.List;

public interface IQuizAttemptsService {
    QuizAttempts startAttempt(QuizAttempts attempt); // Lưu lúc bắt đầu thi
    QuizAttempts submitAttempt(Long id, Double score, boolean isPassed); // Cập nhật lúc nộp bài
    List<QuizAttempts> getHistoryByUser(Long userId);
}
