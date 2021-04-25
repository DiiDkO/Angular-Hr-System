package com.example.test.mappers;


import com.example.test.dtos.CreateRoleDto;
import com.example.test.mappers.resolvers.MappingResolver;
import com.example.test.models.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = MappingResolver.class)
public interface RoleMapper {
    CreateRoleDto toDto(Role entity);
    Role fromDto(CreateRoleDto dto);
}
