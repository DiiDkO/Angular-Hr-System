package com.example.test.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateRoleDto {
    private Long id;
    private String name;
}
