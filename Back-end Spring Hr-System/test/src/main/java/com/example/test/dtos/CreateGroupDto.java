package com.example.test.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class CreateGroupDto {
    @JsonProperty( access = JsonProperty.Access.READ_ONLY )
    private Long id;
    private String name;
    private String email;
    private Long manager;
    private Set<Long> roles;
    private Set<Long> users;
}
