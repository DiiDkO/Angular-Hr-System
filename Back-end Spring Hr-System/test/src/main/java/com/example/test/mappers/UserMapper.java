package com.example.test.mappers;

import com.example.test.dtos.CreateUserDto;
import com.example.test.mappers.resolvers.MappingResolver;
import com.example.test.models.Group;
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
    User fromDto(CreateUserDto dto);

    @Mapping( source = "manager.id", target = "manager" )
    @Mapping( source = "groups", target = "groups", qualifiedByName = "getGroupIds" )
    CreateUserDto toDto(User entity);

    @Named( "getGroupIds" )
    static Set<Long> getGroupIds(Set<Group> groups) {
        return groups.stream()
                .map(Group::getId)
                .collect(Collectors.toSet());
    }
}
