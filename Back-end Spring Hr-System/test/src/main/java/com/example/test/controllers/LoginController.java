package com.example.test.controllers;

import com.example.test.dtos.LoginDto;
import com.example.test.dtos.UserCredentialsDto;
import com.example.test.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login" )
public class LoginController {
    private LoginService delegate;

    @Autowired
    public LoginController(LoginService delegate) {
        this.delegate = delegate;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public LoginDto login(@RequestBody UserCredentialsDto userCredentialsDto) {
        return delegate.login(userCredentialsDto.getUsername(), userCredentialsDto.getPassword());
    }
}
