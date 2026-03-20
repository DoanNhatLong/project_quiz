package com.example.ss6_quiz.service;

import com.example.ss6_quiz.entity.Quizzes;

import java.util.List;

public interface IQuizzesService {
    List<Quizzes> getAllQuizzes();
    Quizzes getQuizById(Long id);
    Quizzes createQuiz(Quizzes quiz);
    Quizzes updateQuiz(Long id, Quizzes quizDetails);
    void deleteQuiz(Long id);
}
