package com.example.ss6_quiz.service;

import com.example.ss6_quiz.dto.QuestionsRequestDTO;
import com.example.ss6_quiz.dto.QuestionsResponseDTO;
import com.example.ss6_quiz.entity.Questions;

import java.util.List;

public interface IQuestionsService {
    List<QuestionsResponseDTO> getAll();
    List<QuestionsResponseDTO> getByQuizId(Long quizId);
    QuestionsResponseDTO getById(Long id);
    QuestionsResponseDTO create(QuestionsRequestDTO dto);
    QuestionsResponseDTO update(Long id, QuestionsRequestDTO dto);
    void delete(Long id);
    List<Questions> findRandom10ByQuizId(Long quizId);
}
