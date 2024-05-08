package com.example.backend.auth;

import com.example.backend.config.JwtService;
import com.example.backend.model.Cart;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final HttpServletRequest httpServletRequest;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    public AuthResponse register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.CLIENT);
        Cart createdCart = cartRepository.save(new Cart());
        user.setCart(createdCart);
        User createdClient = userService.setUser(user);
        CustomUserDetails userDetails = new CustomUserDetails(createdClient.getEmail(), createdClient.getPassword(), Role.CLIENT);
        String token = jwtService.generateToken(userDetails, user.getRole().toString(), user.getIdUser());
        return AuthResponse.builder().token(token).build();
    }

    public AuthResponse authenticate(@NotNull String email, @NotNull String password) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));

        User u = userRepository.findByEmail(email).orElseGet(() -> null);
        CustomUserDetails user = null;
        if(u != null)
            user = new CustomUserDetails(u.getEmail(), u.getPassword(), u.getRole());
        else
            throw new UsernameNotFoundException("User not found with username: " + email);

        var token = jwtService.generateToken(user, user.getRole(), u.getIdUser());
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse authenticate(AuthRequest authRequest) {
        return authenticate(authRequest.getEmail(), authRequest.getPassword());
    }

    public User getSessionUser() {
        String token = getSessionToken();
        String prefix = "Bearer";
        token = token.substring(prefix.length());
        String email = jwtService.extractUserName(token);
        return userRepository.findByEmail(email).get();
    }

    private String getSessionToken() {
        return httpServletRequest.getHeader("Authorization");
    }

    public void changePassword(String password) {
        User user = getSessionUser();
        user.setPassword(passwordEncoder.encode(password));
        userService.setUser(user);
    }

    public void editUserData(User user) {
        User currentUser = getSessionUser();
        currentUser.setFirstName(user.getFirstName());
        currentUser.setLastName(user.getLastName());
        currentUser.setEmail(user.getEmail());
        currentUser.setCity(user.getCity());
        currentUser.setHouseNumber(user.getHouseNumber());
        currentUser.setZipcode(user.getZipcode());
        currentUser.setStreet(user.getStreet());
        userRepository.save(currentUser);
    }
}