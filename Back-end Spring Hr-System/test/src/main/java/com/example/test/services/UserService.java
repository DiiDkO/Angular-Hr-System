package com.example.test.services;

import com.example.test.dtos.CreateUserDto;

import java.util.List;

public interface UserService {

    CreateUserDto create(CreateUserDto createUserDto);
    CreateUserDto update(Long id, CreateUserDto createUserDto);
    void delete(Long id);
    CreateUserDto getById(Long id);
    CreateUserDto joinGroup(Long userId, Long groupId);
    CreateUserDto leaveGroup(Long userId, Long groupId);
    List<CreateUserDto> getAll();

}
