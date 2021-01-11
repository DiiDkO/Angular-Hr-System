package com.example.test.dtos;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateLeaveRequestDto {
    private Long id;
    private String startDate;
    private String endDate;
    private Long requestedDays;
    private Long leaveType;
    private String status;
    private Long requestor;
    private Long approver;
}
