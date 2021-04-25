package com.example.test.services;

import com.example.test.dtos.CreateGroupDto;

import java.util.List;

public interface GroupService {
    CreateGroupDto create(CreateGroupDto createGroupDto);
    CreateGroupDto update(Long id, CreateGroupDto createGroupDto);
    CreateGroupDto createRole(Long roleId, Long groupId);
    CreateGroupDto deleteRole(Long roleId, Long groupId);
    void delete(Long id);
    CreateGroupDto getById(Long id);
    List<CreateGroupDto> getAll();
}
