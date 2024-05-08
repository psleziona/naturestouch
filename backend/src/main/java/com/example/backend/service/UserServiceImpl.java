package com.example.backend.service;

import com.example.backend.auth.AuthService;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Override
    public User setUser(User user) {
        return userRepository.save(user);
    }
}
