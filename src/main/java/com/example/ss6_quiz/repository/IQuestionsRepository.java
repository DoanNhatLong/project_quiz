package com.example.ss6_quiz.repository;

import com.example.ss6_quiz.entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IQuestionsRepository extends JpaRepository<Questions, Long> {
    List<Questions> findByQuizId(Long quizId);
}
