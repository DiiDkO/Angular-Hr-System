package com.example.test.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateLeaveTypeDto {
    private Long id;
    private String name;
}
