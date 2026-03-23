package com.example.ss6_quiz.controller.users;

import com.example.ss6_quiz.dto.QuestionsRequestDto;
import com.example.ss6_quiz.dto.QuestionsResponseDto;
import com.example.ss6_quiz.service.IQuestionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionsController {

    @Autowired
    IQuestionsService questionsService;

    @GetMapping
    public ResponseEntity<List<QuestionsResponseDto>> getAll() {
        return ResponseEntity.ok(questionsService.getAll());
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<QuestionsResponseDto>> getByQuizId(@PathVariable Long quizId) {
        return ResponseEntity.ok(questionsService.getByQuizId(quizId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionsResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(questionsService.getById(id));
    }

    @PostMapping
    public ResponseEntity<QuestionsResponseDto> create(@RequestBody QuestionsRequestDto dto) {
        return ResponseEntity.ok(questionsService.create(dto));
    }


    @PutMapping("/{id}")
    public ResponseEntity<QuestionsResponseDto> update(@PathVariable Long id,
                                                       @RequestBody QuestionsRequestDto dto) {
        return ResponseEntity.ok(questionsService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        questionsService.delete(id);
        return ResponseEntity.noContent().build();
    }
}