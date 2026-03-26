package com.example.ss6_quiz.repository;

import com.example.ss6_quiz.entity.ExamAttempts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IExamAttempts extends JpaRepository<ExamAttempts, Long> {
}
