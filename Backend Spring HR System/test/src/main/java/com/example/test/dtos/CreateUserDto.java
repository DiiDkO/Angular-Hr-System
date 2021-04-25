package com.example.test.dtos;

import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateUserDto {

    private Long id;
    private String username;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private Long manager;
    private String password;
    private boolean active;
    private int paidLeaveDays;
    private Set<Long> groups;
    private Set<Long> projects;
    private Long company;
}
