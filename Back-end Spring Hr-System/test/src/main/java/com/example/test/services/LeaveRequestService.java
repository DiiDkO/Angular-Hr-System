package com.example.test.services;
import com.example.test.dtos.CreateLeaveRequestDto;
import java.util.List;

public interface LeaveRequestService {
    CreateLeaveRequestDto create(CreateLeaveRequestDto leaveRequestDto);
    CreateLeaveRequestDto update(Long id, CreateLeaveRequestDto leaveRequestDto);
    void delete(Long id);
    CreateLeaveRequestDto getById(Long id);
    List<CreateLeaveRequestDto> getAll();
    List<CreateLeaveRequestDto> getLeaveRequestsByRequestor(Long requestorId);
    List<CreateLeaveRequestDto> getLeaveRequestsByApprover(Long managerId);
}
