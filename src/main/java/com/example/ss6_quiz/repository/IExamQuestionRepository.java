package com.example.ss6_quiz.repository;

import com.example.ss6_quiz.entity.ExamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IExamQuestion extends JpaRepository<ExamQuestion, Long> {
}
