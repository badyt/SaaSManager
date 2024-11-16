package org.example.saasmanager.auth.controller;


import com.example.auth.api.AuthApi;
import com.example.auth.model.LoginRequest;
import com.example.auth.model.LoginResponse;
import com.example.auth.model.RegisterRequest;
import com.example.auth.model.RegisterResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.saasmanager.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AuthenticationController implements AuthApi {
    private final AuthenticationService authService;

    @Autowired
    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }


    @Override
    public ResponseEntity<LoginResponse> authLoginPost(LoginRequest loginRequest) {
        return AuthApi.super.authLoginPost(loginRequest);
    }

    @Override
    public ResponseEntity<RegisterResponse> authRegisterPost(RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }


}