package com.example.ss6_quiz.service;

import com.example.ss6_quiz.entity.Quizzes;
import com.example.ss6_quiz.repository.IQuizzesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizzesService implements IQuizzesService {
    @Autowired
    private IQuizzesRepository quizzesRepository;

    @Override
    public List<Quizzes> getAllQuizzes() {
        return quizzesRepository.findAll();
    }

    @Override
    public Quizzes getQuizById(Long id) {
        return quizzesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bộ câu hỏi này!"));
    }

    @Override
    public Quizzes createQuiz(Quizzes quiz) {
        return quizzesRepository.save(quiz);
    }

    @Override
    public Quizzes updateQuiz(Long id, Quizzes quizDetails) {
        Quizzes quiz = getQuizById(id);
        quiz.setTitle(quizDetails.getTitle());
        quiz.setDescription(quizDetails.getDescription());
        quiz.setPassScore(quizDetails.getPassScore());
        return quizzesRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long id) {
        Quizzes quiz = getQuizById(id);
        quiz.setDeleted(true);
        quizzesRepository.save(quiz);
    }
}
