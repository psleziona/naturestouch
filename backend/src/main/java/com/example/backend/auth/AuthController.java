package com.example.backend.auth;

import com.example.backend.model.User;
import com.example.backend.violation.ValidationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final ValidationService<User> validationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {
        validationService.validate(user);
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/passwordChange")
    public ResponseEntity<Void> changePassword(@RequestBody AuthRequest request) {
        authService.changePassword(request.getPassword());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/edit")
    public ResponseEntity<Void> editUserData(@RequestBody User user) {
        authService.editUserData(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUserData() {
        return ResponseEntity.of(Optional.of(authService.getSessionUser()));
    }
}