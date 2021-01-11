package com.example.test.repositories;

import com.example.test.dtos.CreateLeaveRequestDto;
import com.example.test.models.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

}
