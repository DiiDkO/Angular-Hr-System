package com.example.test.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserCredentialsDto {
    String username;
    String password;
}
