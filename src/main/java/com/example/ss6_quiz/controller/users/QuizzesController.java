package com.example.ss6_quiz.controller.users;

import com.example.ss6_quiz.entity.Questions;
import com.example.ss6_quiz.entity.Quizzes;
import com.example.ss6_quiz.service.IQuestionsService;
import com.example.ss6_quiz.service.IQuizzesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
public class QuizzesController {
    @Autowired
    private IQuizzesService quizzesService;
    @Autowired
    private IQuestionsService questionsService;

    @GetMapping
    public List<Quizzes> getAll() {
        return quizzesService.getAllQuizzes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quizzes> getById(@PathVariable Long id) {
        return ResponseEntity.ok(quizzesService.getQuizById(id));
    }

    @PostMapping
    public Quizzes create(@RequestBody Quizzes quiz) {
        return quizzesService.createQuiz(quiz);
    }

    @GetMapping("/{id}/play")
    public List<Questions> test(@PathVariable Long id) {
        return questionsService.findRandom10ByQuizId(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quizzes> update(@PathVariable Long id, @RequestBody Quizzes quizDetails) {
        return ResponseEntity.ok(quizzesService.updateQuiz(id, quizDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        quizzesService.deleteQuiz(id);
        return ResponseEntity.ok("Đã xóa bộ câu hỏi thành công!");
    }

}
