package com.example.ss6_quiz.config;

import com.example.ss6_quiz.entity.Users;
import com.example.ss6_quiz.repository.IRolesRepository;
import com.example.ss6_quiz.repository.IUsersRepository;
import com.example.ss6_quiz.service.IRolesService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private IUsersRepository usersRepository;
    @Autowired
    private IRolesService rolesService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        // Tự tạo user nếu chưa có trong DB
        usersRepository.findByEmail(email).orElseGet(() -> {
            Users newUser = new Users();
            newUser.setEmail(email);
            newUser.setUsername(name);
            newUser.setPassword("");
            newUser.setRoles(rolesService.findById(2L));
            return usersRepository.save(newUser);
        });

        response.sendRedirect("http://localhost:5173/home");
    }
}