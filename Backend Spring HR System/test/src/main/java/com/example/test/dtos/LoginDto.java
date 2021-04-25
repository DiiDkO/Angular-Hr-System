package com.example.test.dtos;

import lombok.Data;

import java.util.List;

@Data
public class LoginDto {
    Long id;
    String username;
    String password;
    boolean isValid;
    List<String> roles;

    public LoginDto(Long id,String username,String password, List<String> roles, boolean isValid) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.isValid = isValid;
    }
}
