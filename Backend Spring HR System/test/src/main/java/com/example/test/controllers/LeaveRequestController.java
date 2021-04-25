package com.example.test.controllers;
import com.example.test.dtos.CreateLeaveRequestDto;
import com.example.test.services.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leave_requests")
public class LeaveRequestController {
    private LeaveRequestService delegate;
    @Autowired
    public LeaveRequestController(LeaveRequestService delegate) {this.delegate = delegate;}
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public CreateLeaveRequestDto create(@RequestBody CreateLeaveRequestDto leaveRequestDto) {
        return delegate.create(leaveRequestDto);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public CreateLeaveRequestDto update(@PathVariable Long id, @RequestBody CreateLeaveRequestDto leaveRequestDto) {
        return delegate.update(id, leaveRequestDto);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        delegate.delete(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping( "/{id}")
    public CreateLeaveRequestDto getById(@PathVariable Long id) {
        return delegate.getById(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<CreateLeaveRequestDto> getAll() {
        return delegate.getAll();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping( "requestor/{requestorId}")
    public List<CreateLeaveRequestDto> getLeaveRequestsByRequestor(@PathVariable Long requestorId) {
        return delegate.getLeaveRequestsByRequestor(requestorId);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping( "approver/{approverId}")
    public List<CreateLeaveRequestDto> getLeaveRequestsByApprover(@PathVariable Long approverId) {
        return delegate.getLeaveRequestsByApprover(approverId);
    }
}
