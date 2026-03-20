package com.example.ss6_quiz.controller.users;

import com.example.ss6_quiz.entity.QuizAttempts;
import com.example.ss6_quiz.service.IQuizAttemptsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz-attempts")
public class QuizAttemptsController {
    @Autowired
    private IQuizAttemptsService attemptService;

    @PostMapping("/start")
    public ResponseEntity<QuizAttempts> start(@RequestBody QuizAttempts attempt) {
        return ResponseEntity.ok(attemptService.startAttempt(attempt));
    }

    @PatchMapping("/{id}/submit")
    public ResponseEntity<QuizAttempts> submit(
            @PathVariable Long id,
            @RequestParam Double score,
            @RequestParam boolean isPassed) {
        return ResponseEntity.ok(attemptService.submitAttempt(id, score, isPassed));
    }

    @GetMapping("/user/{userId}")
    public List<QuizAttempts> getHistory(@PathVariable Long userId) {
        return attemptService.getHistoryByUser(userId);
    }
}
