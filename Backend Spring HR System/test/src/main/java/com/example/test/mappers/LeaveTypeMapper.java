package com.example.test.mappers;

import com.example.test.dtos.CreateLeaveTypeDto;
import com.example.test.mappers.resolvers.MappingResolver;
import com.example.test.models.LeaveType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = MappingResolver.class)
public interface LeaveTypeMapper {
    CreateLeaveTypeDto toDto(LeaveType entity);
    LeaveType fromDto(CreateLeaveTypeDto dto);
}
