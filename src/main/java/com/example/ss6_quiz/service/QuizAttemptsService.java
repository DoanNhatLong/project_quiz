package com.example.ss6_quiz.service;

import com.example.ss6_quiz.entity.QuizAttempts;
import com.example.ss6_quiz.repository.IQuizAttemptsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizAttemptsService implements IQuizAttemptsService {
    @Autowired
    private IQuizAttemptsRepository attemptRepository;

    @Override
    public QuizAttempts startAttempt(QuizAttempts attempt) {
        attempt.setStartTime(LocalDateTime.now());
        return attemptRepository.save(attempt);
    }

    @Override
    public QuizAttempts submitAttempt(Long id, Double score, boolean isPassed) {
        QuizAttempts attempt = attemptRepository.findById(id).orElseThrow();
        attempt.setScore(score);
        attempt.setPassed(isPassed);
        attempt.setEndTime(LocalDateTime.now());
        return attemptRepository.save(attempt);
    }

    @Override
    public List<QuizAttempts> getHistoryByUser(Long userId) {
        return attemptRepository.findAllByUserId(userId);
    }
}
