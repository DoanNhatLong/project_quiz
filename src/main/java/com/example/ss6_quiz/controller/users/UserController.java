package com.example.ss6_quiz.controller.users;

import com.example.ss6_quiz.entity.Users;
import com.example.ss6_quiz.service.IUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    @Autowired
    IUsersService usersService;

    // 1. Lấy danh sách (Read)
    @GetMapping
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }

    // 2. Lấy 1 người dùng theo ID (Read)
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(usersService.getUserById(id));
    }

    // 3. Tạo mới (Create)
    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return usersService.createUser(user);
    }

    // 4. Cập nhật (Update)
    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users userDetails) {
        return ResponseEntity.ok(usersService.updateUser(id, userDetails));
    }

    // 5. Xóa (Delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        usersService.deleteUser(id);
        return ResponseEntity.ok("Đã xóa người dùng thành công");
    }
}
