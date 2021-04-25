package com.example.test.services;

import com.example.test.dtos.LoginDto;

public interface LoginService {
    LoginDto login(String username, String password);
}
