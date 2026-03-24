package com.example.ss6_quiz.repository;

import com.example.ss6_quiz.dto.UserSystemDto;
import com.example.ss6_quiz.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<Users> findByUsername(String username);
    @Query("SELECT new com.example.ss6_quiz.dto.UserSystemDto(" +
           "u.id, u.username, u.email, u.xp, u.point) " +
           "FROM Users u")
    List<UserSystemDto> findAllUserSystemDto();
}