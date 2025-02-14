package org.example.saasmanager.auth.controller;


import com.example.auth.model.LoginRequest;
import com.example.auth.model.LoginResponse;
import com.example.auth.model.RegisterRequest;
import com.example.auth.model.RegisterResponse;
import com.example.users.model.UserDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.saasmanager.auth.config.JwtService;
import org.example.saasmanager.user.mapper.UserMapper;
import org.example.saasmanager.user.repository.RoleRepository;
import org.example.saasmanager.user.repository.UserRepository;
import net.saas.shared.entities.User;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public RegisterResponse register(RegisterRequest request) {
        UserDTO userDTO = new UserDTO()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRoleId())
                .name(request.getName())
                .createdAt(OffsetDateTime.now());
        User user = userMapper.toEntity(userDTO, roleRepository);
        repository.save(user);
        return new RegisterResponse().message("Successfully Registered New User!");
    }

    public LoginResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        var jwtToken = jwtService.generateToken(user,user.getUserId());
        var refreshToken = jwtService.generateRefreshToken(user);
        return new LoginResponse()
                .userId(user.getUserId())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .name(user.getName())
                .status(user.getStatus())
                .role(user.getRole().getRoleName().name())
                .email(user.getEmail());
    }


    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        final String refreshToken = authHeader.substring(7);
        final String userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            var user = repository.findByEmail(userEmail).orElseThrow();

            if (jwtService.isTokenValid(refreshToken, user)) {
                var newAccessToken = jwtService.generateToken(user, user.getUserId());

                // **Generate a new refresh token only if it is expired**
                var newRefreshToken = jwtService.isTokenExpired(refreshToken)
                        ? jwtService.generateRefreshToken(user) // Generate a new one
                        : refreshToken; // Keep the old one if it's still valid

                var authResponse = new LoginResponse()
                        .userId(user.getUserId())
                        .accessToken(newAccessToken)
                        .refreshToken(newRefreshToken)
                        .name(user.getName())
                        .role(user.getRole().getRoleName().name())
                        .email(user.getEmail())
                        .status(user.getStatus());
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}