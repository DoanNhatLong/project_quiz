package com.example.ss6_quiz.service;

import com.example.ss6_quiz.dto.UserSystemDto;
import com.example.ss6_quiz.entity.Users;

import java.util.List;

public interface IUsersService {
    List<Users> getAllUsers();
    Users getUserById(Long id);
    Users createUser(Users user);
    Users updateUser(Long id, Users userDetails);
    void deleteUser(Long id);
    void registerUser(Users user);
    Users login(String username, String password);
    Users findById(Long id);
    List<UserSystemDto> findAllUserSystemDto();
}
