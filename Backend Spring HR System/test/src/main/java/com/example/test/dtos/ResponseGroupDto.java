package com.example.test.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseGroupDto {
    private Long id;
    private String name;
    private String email;
}
