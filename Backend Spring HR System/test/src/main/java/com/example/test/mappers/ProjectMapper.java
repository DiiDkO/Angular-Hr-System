package com.example.test.mappers;

import com.example.test.dtos.CreateProjectDto;
import com.example.test.mappers.resolvers.MappingResolver;
import com.example.test.models.Project;
import com.example.test.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper( componentModel = "spring", uses = MappingResolver.class )
public interface ProjectMapper {
    @Mapping( source = "users", target = "users", qualifiedByName="getUsersProjectIds" )
    CreateProjectDto toDto(Project entity);

    @Mapping( source = "users", target = "users", ignore = true )
    Project fromDto(CreateProjectDto dto);

    @Named( "getUsersProjectIds" )
    static Set<Long> getUsersProjectIds(Set<User> users) {
        return users.stream()
                .map(User::getId)
                .collect(Collectors.toSet());
    }
}
