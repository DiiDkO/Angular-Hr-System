package com.example.test.services.impl;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import com.example.test.dtos.CreateUserDto;
import com.example.test.exceptions.GroupNotFoundException;
import com.example.test.exceptions.UserNotFoundException;
import com.example.test.mappers.GroupMapper;
import com.example.test.mappers.UserMapper;
import com.example.test.models.Group;
import com.example.test.models.User;
import com.example.test.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.test.repositories.UserRepository;
import com.example.test.services.UserService;

@Component
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserMapper userMapper;
    private GroupRepository groupRepository;
    private GroupMapper groupMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, GroupRepository groupRepository, GroupMapper groupMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.groupRepository = groupRepository;
        this.groupMapper = groupMapper;
    }

    @Override
    public CreateUserDto create(CreateUserDto createUserDto) {
        CreateUserDto mappedUser =  userMapper.toDto(userRepository.save(userMapper.fromDto(createUserDto)));
        mappedUser.setPassword("Hidden");
        return mappedUser;
    }

    @Override
    public CreateUserDto update(Long id, CreateUserDto createUserDto) {
        createUserDto.setId(id);
        if (this.userRepository.findById(id).isEmpty())
            throw getUserNotFoundExceptionSupplier(id).get();
        CreateUserDto mappedUser =  userMapper.toDto(userRepository.save(userMapper.fromDto(createUserDto)));
        mappedUser.setPassword("Hidden");
        return mappedUser;
    }

    @Override
    public CreateUserDto joinGroup(Long userId, Long groupId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Group> group = groupRepository.findById(groupId);
        Set<Group> groups;
        if (user.isEmpty()) {
            throw getUserNotFoundExceptionSupplier(userId).get();
        } else
            groups = user.get().getGroups();
        if (group.isEmpty())
            throw getGroupNotFoundExceptionSupplier(groupId).get();
        else {
            groups.add(group.get());
            user.get().setGroups(groups);
        }
        CreateUserDto mappedUser = userMapper.toDto(userRepository.save(user.get()));
        mappedUser.setPassword("Hidden");
        return mappedUser;
    }

    @Override
    public CreateUserDto leaveGroup(Long userId, Long groupId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Group> group = groupRepository.findById(groupId);
        Set<Group> groups;
        if (user.isEmpty()) {
            throw getUserNotFoundExceptionSupplier(userId).get();
        } else
            groups = user.get().getGroups();
        if (group.isEmpty())
            throw getGroupNotFoundExceptionSupplier(groupId).get();
        else {
            groups.remove(group.get());
            user.get().setGroups(groups);
        }
        CreateUserDto mappedUser = userMapper.toDto(userRepository.save(user.get()));
        mappedUser.setPassword("Hidden");
        return mappedUser;
    }

    @Override
    public void delete(Long id) {
        if (userRepository.findById(id).isEmpty())
            throw getUserNotFoundExceptionSupplier(id).get();
        userRepository.deleteById(id);
    }

    @Override
    public CreateUserDto getById(Long id) {
        User user = userRepository.findById(id).orElseThrow(getUserNotFoundExceptionSupplier(id));
        CreateUserDto mappedUser = userMapper.toDto(user);
        mappedUser.setPassword("Hidden");
        return mappedUser;
    }

    @Override
    public List<CreateUserDto> getAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDto).peek(user-> user.setPassword("Hidden"))
                .collect(Collectors.toList());
    }

    private Supplier<UserNotFoundException> getUserNotFoundExceptionSupplier(Long userId) {
        return () -> new UserNotFoundException(MessageFormat.format("User with id \"{0}\" has not been found", userId));
    }

    private Supplier<GroupNotFoundException> getGroupNotFoundExceptionSupplier(Long groupId) {
        return () -> new GroupNotFoundException(MessageFormat.format("Group with id \"{0}\" has not been found", groupId));

    }
}
