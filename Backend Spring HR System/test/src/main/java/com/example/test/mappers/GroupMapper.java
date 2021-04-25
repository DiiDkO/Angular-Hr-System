package com.example.test.mappers;

import com.example.test.dtos.CreateGroupDto;
import com.example.test.mappers.resolvers.MappingResolver;
import com.example.test.models.Group;
import com.example.test.models.Role;
import com.example.test.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper( componentModel = "spring", uses = MappingResolver.class )
public interface GroupMapper {

    @Mapping( source = "manager", target = "manager", ignore = true )
    @Mapping( source = "roles", target = "roles", ignore = true )
    @Mapping( source = "users", target = "users", ignore = true )
    Group fromDto(CreateGroupDto dto);

    @Mapping( source = "manager.id", target = "manager" )
    @Mapping( source = "roles", target = "roles", qualifiedByName = "getRoleIds" )
    @Mapping( source = "users", target = "users", qualifiedByName = "getGroupUsersIds" )
    CreateGroupDto toDto(Group entity);

    @Named( "getRoleIds" )
    static Set<Long> getRoleIds(Set<Role> roles) {
        return roles.stream()
                .map(Role::getId)
                .collect(Collectors.toSet());
    }
    @Named( "getGroupUsersIds" )
    static Set<Long> getGroupUsersIds(Set<User> users) {
        return users.stream()
                .map(User::getId)
                .collect(Collectors.toSet());
    }

}
