package com.example.ss6_quiz.controller.admin.question;

import com.example.ss6_quiz.dto.QuestionsRequestDto;
import com.example.ss6_quiz.dto.QuestionsResponseDto;
import com.example.ss6_quiz.service.IQuestionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/questions")
@CrossOrigin("*")
public class QuestionController {
    @Autowired
    private IQuestionsService questionsService;

    @GetMapping
    public String hello() {
        return "Hello World!";
    }

    @PostMapping
    public QuestionsResponseDto createQuestion(@RequestBody QuestionsRequestDto dto) {
        return questionsService.create(dto);
    }
}
