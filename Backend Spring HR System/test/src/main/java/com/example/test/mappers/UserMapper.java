package com.example.test.mappers;

import com.example.test.dtos.CreateUserDto;
import com.example.test.mappers.resolvers.MappingResolver;
import com.example.test.models.Company;
import com.example.test.models.Group;
import com.example.test.models.Project;
import com.example.test.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper( componentModel = "spring", uses = MappingResolver.class )
public interface UserMapper {
    @Mapping( source = "manager", target = "manager", ignore = true )
    @Mapping( source = "groups", target = "groups", ignore = true )
    @Mapping( source = "password", target = "password", ignore = true )
    @Mapping( source = "projects", target = "projects", ignore = true )
    @Mapping( source = "company", target = "company", ignore = true )
    User fromDto(CreateUserDto dto);


    @Mapping( source = "groups", target = "groups", qualifiedByName = "getGroupIds" )
    @Mapping( source = "projects", target = "projects", qualifiedByName = "getProjectIds" )
    @Mapping( source = "manager.id", target = "manager" )
    @Mapping( source = "company.id", target = "company" )
    CreateUserDto toDto(User entity);

    @Named( "getGroupIds" )
    static Set<Long> getGroupIds(Set<Group> groups) {
        return groups.stream()
                .map(Group::getId)
                .collect(Collectors.toSet());
    }

    @Named( "getProjectIds" )
    static Set<Long> getProjectIds(Set<Project> projects) {
        return projects.stream()
                .map(Project::getId)
                .collect(Collectors.toSet());
    }
    @Named( "getCompanyId" )
    static Long getCompanyId(Company company) {
        if(company.getName() != null)
            return company.getId();
        return null;
    }
}
