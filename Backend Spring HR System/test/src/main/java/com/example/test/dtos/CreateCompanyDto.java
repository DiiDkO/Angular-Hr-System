package com.example.test.dtos;

import com.example.test.models.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class CreateCompanyDto {
    private Long id;
    private String name;
}
