package com.example.test.dtos;

import java.util.Set;

public class ResponseUserDto {
    private Long id;
    private String username;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private Set<ResponseGroupDto> groups;
}
