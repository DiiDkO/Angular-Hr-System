package com.example.test.services;

import com.example.test.dtos.CreateProjectDto;

import java.util.List;

public interface ProjectService {
    CreateProjectDto create(CreateProjectDto createRoleDto);
    CreateProjectDto update(Long id, CreateProjectDto createRoleDto);
    void delete(Long id);
    CreateProjectDto getById(Long id);
    List<CreateProjectDto> getAll();
}
