package com.example.test.services.impl;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import com.example.test.dtos.CreateUserDto;
import com.example.test.exceptions.GroupNotFoundException;
import com.example.test.exceptions.ProjectNotFoundException;
import com.example.test.exceptions.UserNotFoundException;
import com.example.test.mappers.GroupMapper;
import com.example.test.mappers.ProjectMapper;
import com.example.test.mappers.UserMapper;
import com.example.test.models.Group;
import com.example.test.models.Project;
import com.example.test.models.User;
import com.example.test.repositories.GroupRepository;
import com.example.test.repositories.ProjectRepository;
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
    private ProjectRepository projectRepository;
    private ProjectMapper projectMapper;
    private final Integer paidLeaveDays = 20;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, GroupRepository groupRepository, GroupMapper groupMapper, ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.groupRepository = groupRepository;
        this.groupMapper = groupMapper;
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public CreateUserDto create(CreateUserDto createUserDto) {
        createUserDto.setPaidLeaveDays(paidLeaveDays);
        CreateUserDto mappedUser =  userMapper.toDto(userRepository.save(userMapper.fromDto(createUserDto)));
        mappedUser.setPassword("Hidden");
        return mappedUser;
    }

    @Override
    public CreateUserDto update(Long id, CreateUserDto createUserDto) {
        createUserDto.setId(id);
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty())
            throw getUserNotFoundExceptionSupplier(id).get();
        User existingUser = optionalUser.get();
        User updatedUser = userMapper.fromDto(createUserDto);
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setMiddleName(updatedUser.getMiddleName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setManager(updatedUser.getManager());
        existingUser.setGroups(updatedUser.getGroups());
        existingUser.setActive(updatedUser.isActive());
        existingUser.setProjects(updatedUser.getProjects());
        existingUser.setCompany(updatedUser.getCompany());
        existingUser.setPaidLeaveDays(updatedUser.getPaidLeaveDays());
        existingUser.setPassword(updatedUser.getPassword());
        userRepository.save(existingUser);
        CreateUserDto result = userMapper.toDto(existingUser);
        result.setPassword("Hidden");
        return result;
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
    public CreateUserDto joinProject(Long userId, Long projectId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Project> project = projectRepository.findById(projectId);
        Set<Project> projects;
        if (user.isEmpty()) {
            throw getUserNotFoundExceptionSupplier(userId).get();
        } else
            projects = user.get().getProjects();
        if (project.isEmpty())
            throw getProjectNotFoundExceptionSupplier(projectId).get();
        else {
            projects.add(project.get());
            user.get().setProjects(projects);
        }
        CreateUserDto mappedUser = userMapper.toDto(userRepository.save(user.get()));
        mappedUser.setPassword("Hidden");
        return mappedUser;
    }

    @Override
    public CreateUserDto leaveProject(Long userId, Long projectId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Project> project = projectRepository.findById(projectId);
        Set<Project> projects;
        if (user.isEmpty()) {
            throw getUserNotFoundExceptionSupplier(userId).get();
        } else
            projects = user.get().getProjects();
        if (project.isEmpty())
            throw getProjectNotFoundExceptionSupplier(projectId).get();
        else {
            projects.remove(project.get());
            user.get().setProjects(projects);
        }
        CreateUserDto mappedUser = userMapper.toDto(userRepository.save(user.get()));
        mappedUser.setPassword("Hidden");
        return mappedUser;
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(getUserNotFoundExceptionSupplier(id));
        user.setCompany(null);
        user.setManager(null);
        userRepository.save(user);
        userRepository.deleteUserGroupRelation(id);
        userRepository.deleteUserProjectRelation(id);
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
    private Supplier<ProjectNotFoundException> getProjectNotFoundExceptionSupplier(Long projectId) {
        return () -> new ProjectNotFoundException(MessageFormat.format("Project with id \"{0}\" has not been found", projectId));

    }
}
