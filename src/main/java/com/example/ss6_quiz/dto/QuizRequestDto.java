package com.example.ss6_quiz.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record QuizRequestDto(
        String title,
        String description,

        @JsonProperty("pass_score")
        Double passScore
) {}