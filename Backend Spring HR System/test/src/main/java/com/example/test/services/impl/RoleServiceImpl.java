package com.example.test.services.impl;

import com.example.test.dtos.CreateRoleDto;
import com.example.test.exceptions.RoleNotFoundException;
import com.example.test.mappers.GroupMapper;
import com.example.test.mappers.RoleMapper;
import com.example.test.models.Group;
import com.example.test.models.Role;
import com.example.test.repositories.GroupRepository;
import com.example.test.repositories.RoleRepository;
import com.example.test.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Component
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;
    private RoleMapper roleMapper;
    private GroupMapper groupMapper;
    private GroupRepository groupRepository;
    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository, RoleMapper roleMapper, GroupRepository groupRepository, GroupMapper groupMapper) {
            this.roleRepository = roleRepository;
            this.roleMapper = roleMapper;
            this.groupMapper = groupMapper;
            this.groupRepository = groupRepository;
    }

    @Override
    public CreateRoleDto create(CreateRoleDto createRoleDto) {
        return roleMapper.toDto(roleRepository.save(roleMapper.fromDto(createRoleDto)));
    }

    @Override
    public CreateRoleDto update(Long id, CreateRoleDto createRoleDto) {
        createRoleDto.setId(id);
        if(roleRepository.findById(id).isEmpty())
            throw getRoleNotFoundExceptionSupplier(id).get();
        return roleMapper.toDto(roleRepository.save(roleMapper.fromDto(createRoleDto)));
    }

    @Override
    public void delete(Long id) {
        Optional<Role> role = roleRepository.findById(id);
        if(role.isEmpty())
            throw getRoleNotFoundExceptionSupplier(id).get();
        roleRepository.deleteGroupRoleRelation(id);
        roleRepository.deleteById(id);
    }

    @Override
    public CreateRoleDto getById(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(getRoleNotFoundExceptionSupplier(id));
        return roleMapper.toDto(role);
    }

    @Override
    public List<CreateRoleDto> getAll() {
        return roleRepository.findAll()
                             .stream()
                             .map(roleMapper::toDto)
                             .collect(Collectors.toList());
    }
    private Supplier<RoleNotFoundException> getRoleNotFoundExceptionSupplier(Long roleId) {
        return () -> new RoleNotFoundException(MessageFormat.format("Role with id \"{0}\" has not been found", roleId));
    }
}
