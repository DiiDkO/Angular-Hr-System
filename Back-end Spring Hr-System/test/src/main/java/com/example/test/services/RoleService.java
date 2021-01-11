package com.example.test.services;


import com.example.test.dtos.CreateRoleDto;

import java.util.List;

public interface RoleService {
    CreateRoleDto create(CreateRoleDto createRoleDto);
    CreateRoleDto update(Long id, CreateRoleDto createRoleDto);
    void delete(Long id);
    CreateRoleDto getById(Long id);
    List<CreateRoleDto> getAll();
}
