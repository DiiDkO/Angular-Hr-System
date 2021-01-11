package com.example.test.mappers;

import com.example.test.dtos.CreateLeaveRequestDto;
import com.example.test.mappers.resolvers.MappingResolver;
import com.example.test.models.LeaveRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.sql.Date;
import java.text.ParseException;


@Mapper(componentModel = "spring", uses = MappingResolver.class)
public interface LeaveRequestMapper {

    @Mapping(source = "requestor.id", target = "requestor")
    @Mapping(source = "approver.id", target = "approver")
    @Mapping(source = "leaveType.id", target = "leaveType")
    @Mapping(source = "startDate", target= "startDate", qualifiedByName = "getDateFromEntity")
    @Mapping(source = "endDate", target= "endDate", qualifiedByName = "getDateFromEntity")
    CreateLeaveRequestDto toDto(LeaveRequest entity);


    @Mapping( source = "requestor", target = "requestor", ignore = true)
    @Mapping( source = "approver", target = "approver", ignore = true)
    @Mapping( source = "leaveType", target = "leaveType.id")
    @Mapping(source = "startDate", target= "startDate", qualifiedByName = "getDateFromDto")
    @Mapping(source = "endDate", target= "endDate", qualifiedByName = "getDateFromDto")
    LeaveRequest fromDto(CreateLeaveRequestDto dto);

    @Named("getDateFromDto")
    static Date getDateFromDto(String date) throws ParseException {
        Date entityDate = Date.valueOf(date);
        return entityDate;
    }

    @Named("getDateFromEntity")
    static String getDateFromEntity( Date date) {
     return date.toString();
    }

}
