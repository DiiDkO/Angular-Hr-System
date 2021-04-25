package com.example.test.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class CreateProjectDto {
    private Long id;
    private String name;
    private Set<Long> users;
}