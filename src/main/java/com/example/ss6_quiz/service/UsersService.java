package com.example.ss6_quiz.service;

import com.example.ss6_quiz.entity.Users;
import com.example.ss6_quiz.repository.IUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService implements IUsersService {
    @Autowired
    private IUsersRepository usersRepository;

    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Users getUserById(Long id) {
        return usersRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
    }

    @Override
    public Users createUser(Users user) {
        return usersRepository.save(user);
    }

    @Override
    public Users updateUser(Long id, Users userDetails) {
        Users user = getUserById(id);
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setXp(userDetails.getXp());
        user.setStreak(userDetails.getStreak());
        return usersRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        // Xóa logic: có thể xóa cứng hoặc set isDeleted = true
        Users user = getUserById(id);
        user.setDeleted(true);
        usersRepository.save(user);
    }
}
