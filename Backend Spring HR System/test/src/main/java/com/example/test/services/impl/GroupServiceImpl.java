package com.example.test.services.impl;

import com.example.test.dtos.CreateGroupDto;
import com.example.test.exceptions.GroupNotFoundException;
import com.example.test.exceptions.NotFoundException;
import com.example.test.exceptions.RoleNotFoundException;
import com.example.test.mappers.GroupMapper;
import com.example.test.mappers.RoleMapper;
import com.example.test.models.Group;
import com.example.test.models.Role;
import com.example.test.repositories.GroupRepository;
import com.example.test.repositories.RoleRepository;
import com.example.test.services.GroupService;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Component
public class GroupServiceImpl implements GroupService {

    private GroupRepository groupRepository;
    private GroupMapper groupMapper;
    private RoleRepository roleRepository;
    private RoleMapper roleMapper;

    public GroupServiceImpl(GroupRepository groupRepository, GroupMapper groupMapper, RoleRepository roleRepository, RoleMapper roleMapper) {
        this.groupRepository = groupRepository;
        this.groupMapper = groupMapper;
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public CreateGroupDto create(CreateGroupDto createGroupDto) {
        return groupMapper.toDto(groupRepository.save(groupMapper.fromDto(createGroupDto)));
    }

    @Override
    public CreateGroupDto update(Long id, CreateGroupDto createGroupDto) {
        createGroupDto.setId(id);
        if (groupRepository.findById(id).isEmpty())
            throw getGroupNotFoundExceptionSupplier(id).get();
       // groupRepository.deleteById(id);
        return groupMapper.toDto(groupRepository.save(groupMapper.fromDto(createGroupDto)));
    }

    @Override
    public CreateGroupDto createRole(Long roleId, Long groupId) {
        Optional<Role> role = roleRepository.findById(roleId);
        Optional<Group> group = groupRepository.findById(groupId);
        Set<Role> roles;
        if (role.isEmpty()) {
            throw getRoleNotFoundExceptionSupplier(roleId).get();
        } else
            roles = group.get().getRoles();
        if (group.isEmpty())
            throw getGroupNotFoundExceptionSupplier(groupId).get();
        else {
            roles.add(role.get());
            group.get().setRoles(roles);
        }
        return groupMapper.toDto(groupRepository.save(group.get()));
    }

    @Override
    public CreateGroupDto deleteRole(Long roleId, Long groupId) {
        Optional<Role> role = roleRepository.findById(roleId);
        Optional<Group> group = groupRepository.findById(groupId);
        Set<Role> roles;
        if (role.isEmpty()) {
            throw getRoleNotFoundExceptionSupplier(roleId).get();
        } else
            roles = group.get().getRoles();
        if (group.isEmpty())
            throw getGroupNotFoundExceptionSupplier(groupId).get();
        else {
            roles.remove(role.get());
            group.get().setRoles(roles);
        }
        return groupMapper.toDto(groupRepository.save(group.get()));
    }

    @Override
    public void delete(Long id) {
        Group group = groupRepository.findById(id).orElseThrow(getGroupNotFoundExceptionSupplier(id));
        group.setManager(null);
        groupRepository.save(group);
        groupRepository.deleteUserGroupRelation(id);
        groupRepository.deleteById(id);
    }

    @Override
    public CreateGroupDto getById(Long id) {
        Group group = groupRepository.findById(id).orElseThrow(getGroupNotFoundExceptionSupplier(id));
        return groupMapper.toDto(group);
    }

    @Override
    public List<CreateGroupDto> getAll() {
        return groupRepository.findAll()
                .stream()
                .map(groupMapper::toDto)
                .collect(Collectors.toList());
    }

    private Supplier<GroupNotFoundException> getGroupNotFoundExceptionSupplier(Long groupId) {
        return () -> new GroupNotFoundException(MessageFormat.format("Group with id \"{0}\" has not been found", groupId));
    }

    private Supplier<RoleNotFoundException> getRoleNotFoundExceptionSupplier(Long roleId) {
        return () -> new RoleNotFoundException(MessageFormat.format("Role with id \"{0}\" has not been found", roleId));
    }
}
