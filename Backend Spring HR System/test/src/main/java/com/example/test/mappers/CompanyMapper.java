package com.example.test.mappers;

import com.example.test.dtos.CreateCompanyDto;
import com.example.test.mappers.resolvers.MappingResolver;
import com.example.test.models.Company;
import com.example.test.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper( componentModel = "spring", uses = MappingResolver.class )
public interface CompanyMapper {
    CreateCompanyDto toDto(Company entity);
    Company fromDto(CreateCompanyDto dto);
}
