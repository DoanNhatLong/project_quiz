package com.example.ss6_quiz.service;

import com.example.ss6_quiz.dto.QuestionsRequestDTO;
import com.example.ss6_quiz.dto.QuestionsResponseDTO;
import com.example.ss6_quiz.entity.Questions;
import com.example.ss6_quiz.entity.Quizzes;
import com.example.ss6_quiz.repository.IQuestionsRepository;
import com.example.ss6_quiz.repository.IQuizzesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionsService implements IQuestionsService {
    @Autowired
    private IQuestionsRepository questionsRepository;

    @Autowired
    private IQuizzesRepository quizzesRepository;

    private QuestionsResponseDTO toDTO(Questions q) {
        return new QuestionsResponseDTO(
                q.getId(),
                q.getQuiz().getId(),
                q.getQuiz().getTitle(),
                q.getContent(),
                q.getType(),
                q.getOrderIndex(),
                q.getCreatedAt()
        );
    }

    @Override
    public List<QuestionsResponseDTO> getAll() {
        return questionsRepository.findAll()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<QuestionsResponseDTO> getByQuizId(Long quizId) {
        return questionsRepository.findByQuizId(quizId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public QuestionsResponseDTO getById(Long id) {
        Questions q = questionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        return toDTO(q);
    }

    @Override
    public QuestionsResponseDTO create(QuestionsRequestDTO dto) {
        Quizzes quiz = quizzesRepository.findById(dto.quizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        Questions q = new Questions();
        q.setQuiz(quiz);
        q.setContent(dto.content());
        q.setType(dto.type() != null ? dto.type() : Questions.QuestionType.single);
        q.setOrderIndex(dto.orderIndex());
        return toDTO(questionsRepository.save(q));
    }

    @Override
    public QuestionsResponseDTO update(Long id, QuestionsRequestDTO dto) {
        Questions q = questionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (dto.quizId() != null) {
            Quizzes quiz = quizzesRepository.findById(dto.quizId())
                    .orElseThrow(() -> new RuntimeException("Quiz not found"));
            q.setQuiz(quiz);
        }
        q.setContent(dto.content());
        if (dto.type() != null) q.setType(dto.type());
        if (dto.orderIndex() != null) q.setOrderIndex(dto.orderIndex());
        return toDTO(questionsRepository.save(q));
    }

    @Override
    public void delete(Long id) {
        Questions q = questionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        q.setDeleted(true);
        questionsRepository.save(q);
    }

    @Override
    public List<Questions> findRandom10ByQuizId(Long quizId) {
        return questionsRepository.findRandom10ByQuizId(quizId);
    }
}
