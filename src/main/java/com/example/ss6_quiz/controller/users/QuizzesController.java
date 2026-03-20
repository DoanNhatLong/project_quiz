package com.example.ss6_quiz.controller.users;

import com.example.ss6_quiz.entity.Quizzes;
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

    // Lấy toàn bộ danh sách Quiz
    @GetMapping
    public List<Quizzes> getAll() {
        return quizzesService.getAllQuizzes();
    }

    // Lấy chi tiết 1 Quiz theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Quizzes> getById(@PathVariable Long id) {
        return ResponseEntity.ok(quizzesService.getQuizById(id));
    }

    // Tạo mới một Quiz
    @PostMapping
    public Quizzes create(@RequestBody Quizzes quiz) {
        return quizzesService.createQuiz(quiz);
    }

    // Cập nhật thông tin Quiz
    @PutMapping("/{id}")
    public ResponseEntity<Quizzes> update(@PathVariable Long id, @RequestBody Quizzes quizDetails) {
        return ResponseEntity.ok(quizzesService.updateQuiz(id, quizDetails));
    }

    // Xóa mềm Quiz
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        quizzesService.deleteQuiz(id);
        return ResponseEntity.ok("Đã xóa bộ câu hỏi thành công!");
    }

}
