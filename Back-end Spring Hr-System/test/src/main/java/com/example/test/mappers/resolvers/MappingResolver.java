package com.example.test.mappers.resolvers;

import com.example.test.dtos.CreateGroupDto;
import com.example.test.dtos.CreateLeaveRequestDto;
import com.example.test.dtos.CreateUserDto;
import com.example.test.models.Group;
import com.example.test.models.LeaveRequest;
import com.example.test.models.User;
import com.example.test.repositories.GroupRepository;
import com.example.test.repositories.RoleRepository;
import com.example.test.repositories.UserRepository;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class MappingResolver {

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;
    private GroupRepository groupRepository;
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public MappingResolver(UserRepository userRepository, GroupRepository groupRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.roleRepository = roleRepository;
    }

    @ObjectFactory
    public User resolve(CreateUserDto dto, @TargetType Class<User> type) {
        User user = new User();
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        if (dto.getManager() != null) {
            user.setManager(userRepository.getOne(dto.getManager()));
        }
        user.getGroups()
                .addAll(groupRepository.findAllById(dto.getGroups()));
        return user;

    }

    @ObjectFactory
    public Group resolve(CreateGroupDto dto, @TargetType Class<Group> type) {
        Group group = new Group();

        if (dto.getManager() != null) {
            group.setManager(userRepository.getOne(dto.getManager()));
        }
        group.getRoles()
                .addAll(roleRepository.findAllById(dto.getRoles()));
        userRepository.findAllById(dto.getUsers()).forEach(user -> {
            user.getGroups().forEach(checkedGroup -> {
                if (checkGroupExistance(checkedGroup.getId(), user.getGroups())) {
                    group.getUsers().add(user);
                    user.getGroups().add(group);
                }
            });
        });
        return group;
    }

    private boolean checkGroupExistance(Long groupId, Set<Group> groups) {
        boolean isIdExisted = true;
        for (Group group : groups) {
            if (group.getId() == groupId)
                isIdExisted = false;
        }
        return isIdExisted;
    }

    @ObjectFactory
    public LeaveRequest resolve(CreateLeaveRequestDto dto, @TargetType Class<LeaveRequest> type) {
        LeaveRequest leaveRequest = new LeaveRequest();
        if (dto.getApprover() != null) {
            leaveRequest.setApprover(userRepository.getOne(dto.getApprover()));
        }
        if (dto.getRequestor() != null) {
            leaveRequest.setRequestor(userRepository.getOne(dto.getRequestor()));
        }
        return leaveRequest;
    }

}
