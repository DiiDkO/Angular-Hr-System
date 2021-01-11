package com.example.test.services;

import com.example.test.dtos.CreateLeaveTypeDto;

import java.util.List;

public interface LeaveTypeService {
    CreateLeaveTypeDto create(CreateLeaveTypeDto roleDto);
    CreateLeaveTypeDto update(Long id, CreateLeaveTypeDto roleDto);
    void delete(Long id);
    CreateLeaveTypeDto getById(Long id);
    List<CreateLeaveTypeDto> getAll();
}
