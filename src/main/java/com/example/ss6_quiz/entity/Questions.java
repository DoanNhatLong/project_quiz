package com.example.ss6_quiz.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "questions")
@SQLRestriction("is_deleted = false")
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quizzes quiz;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('single', 'multiple') DEFAULT 'single'")
    private QuestionType type = QuestionType.single;

    private Integer orderIndex;

    private LocalDateTime createdAt = LocalDateTime.now();

    boolean isDeleted = false;

    public enum QuestionType {
        single, multiple
    }
}