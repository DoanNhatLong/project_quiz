package com.example.ss6_quiz.dto;

public record UpdateProfileRequest(
        Long id,
        String name,
        String oldPassword,
        String newPassword
) {}