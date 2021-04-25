package com.example.test.services.impl;

import com.example.test.dtos.CreateLeaveTypeDto;
import com.example.test.exceptions.LeaveTypeNotFoundException;
import com.example.test.mappers.LeaveTypeMapper;
import com.example.test.models.LeaveType;
import com.example.test.repositories.LeaveTypeRepository;
import com.example.test.services.LeaveTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Component
public class LeaveTypeServiceImpl implements LeaveTypeService {
    private LeaveTypeRepository leaveTypeRepository;
    private LeaveTypeMapper leaveTypeMapper;

    @Autowired
    public LeaveTypeServiceImpl(LeaveTypeRepository leaveTypeRepository, LeaveTypeMapper leaveTypeMapper) {
        this.leaveTypeRepository = leaveTypeRepository;
        this.leaveTypeMapper = leaveTypeMapper;
    }

    @Override
    public CreateLeaveTypeDto create(CreateLeaveTypeDto createLeaveTypeDto) {
        return leaveTypeMapper.toDto(leaveTypeRepository.save(leaveTypeMapper.fromDto(createLeaveTypeDto)));
    }

    @Override
    public CreateLeaveTypeDto update(Long id, CreateLeaveTypeDto createLeaveTypeDto) {
        createLeaveTypeDto.setId(id);
        if(leaveTypeRepository.findById(id).isEmpty())
            throw getLeaveTypeNotFoundExceptionSupplier(id).get();
        return leaveTypeMapper.toDto(leaveTypeRepository.save(leaveTypeMapper.fromDto(createLeaveTypeDto)));
    }

    @Override
    public void delete(Long id) {
        if(leaveTypeRepository.findById(id).isEmpty())
            throw getLeaveTypeNotFoundExceptionSupplier(id).get();
        leaveTypeRepository.deleteById(id);
    }

    @Override
    public CreateLeaveTypeDto getById(Long id) {
        LeaveType leaveType = leaveTypeRepository.findById(id).orElseThrow(getLeaveTypeNotFoundExceptionSupplier(id));
        return leaveTypeMapper.toDto(leaveType);
    }

    @Override
    public List<CreateLeaveTypeDto> getAll() {
        return leaveTypeRepository.findAll()
                                  .stream()
                                  .map(leaveTypeMapper::toDto)
                                  .collect(Collectors.toList());
    }
    private Supplier<LeaveTypeNotFoundException> getLeaveTypeNotFoundExceptionSupplier(Long leaveTypeId) {
        return () -> new LeaveTypeNotFoundException(MessageFormat.format("LeaveType with id \"{0}\" has not been found", leaveTypeId));
    }
}
