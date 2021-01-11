package com.example.test.services.impl;

import com.example.test.dtos.CreateLeaveRequestDto;
import com.example.test.exceptions.LeaveRequestNotFoundException;
import com.example.test.mappers.LeaveRequestMapper;
import com.example.test.models.LeaveRequest;
import com.example.test.repositories.LeaveRequestRepository;
import com.example.test.services.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.text.MessageFormat;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Component
public class LeaveRequestServiceImpl implements LeaveRequestService {

    private LeaveRequestRepository leaveRequestRepository;
    private LeaveRequestMapper leaveRequestMapper;

    @Autowired
    public LeaveRequestServiceImpl(LeaveRequestRepository leaveRequestRepository, LeaveRequestMapper leaveRequestMapper) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.leaveRequestMapper = leaveRequestMapper;
    }

    @Override
    public CreateLeaveRequestDto create(CreateLeaveRequestDto leaveRequestDto) {
        return leaveRequestMapper.toDto(leaveRequestRepository.save(leaveRequestMapper.fromDto(leaveRequestDto)));
    }

    @Override
    public CreateLeaveRequestDto update(Long id, CreateLeaveRequestDto leaveRequestDto) {
        leaveRequestDto.setId(id);
        if(leaveRequestRepository.findById(id).isEmpty())
            throw getLeaveRequestNotFoundExceptionSupplier(id).get();
        return leaveRequestMapper.toDto(leaveRequestRepository.save(leaveRequestMapper.fromDto(leaveRequestDto)));
    }

    @Override
    public void delete(Long id) {
        if(leaveRequestRepository.findById(id).isEmpty())
            throw getLeaveRequestNotFoundExceptionSupplier(id).get();
        leaveRequestRepository.deleteById(id);
    }

    @Override
    public CreateLeaveRequestDto getById(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id).orElseThrow(getLeaveRequestNotFoundExceptionSupplier(id));
        return leaveRequestMapper.toDto(leaveRequest);
    }

    @Override
    public List<CreateLeaveRequestDto> getAll() {
        return leaveRequestRepository.findAll()
                                     .stream()
                                     .map(leaveRequestMapper::toDto)
                                     .collect(Collectors.toList());

    }
    @Override
    public List<CreateLeaveRequestDto> getLeaveRequestsByRequestor(Long requestorId) {
        return leaveRequestRepository.findAll()
                .stream()
                .map(leaveRequestMapper::toDto)
                .filter(leaveRequest -> leaveRequest.getRequestor() == requestorId)
                .collect(Collectors.toList());
    }
    @Override
    public List<CreateLeaveRequestDto> getLeaveRequestsByApprover(Long approverId) {
        return leaveRequestRepository.findAll()
                .stream()
                .map(leaveRequestMapper::toDto)
                .filter(leaveRequest -> leaveRequest.getApprover() == approverId)
                .collect(Collectors.toList());
    }

    private Supplier<LeaveRequestNotFoundException> getLeaveRequestNotFoundExceptionSupplier(Long leaveRequstId) {
        return () -> new LeaveRequestNotFoundException(MessageFormat.format("Leave Request with id \"{0}\" has not been found", leaveRequstId));

    }
}
