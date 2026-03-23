package com.example.ss6_quiz.dto;

public record QuizResultResponse(
        int correct,
        int total,
        double score
) {}
