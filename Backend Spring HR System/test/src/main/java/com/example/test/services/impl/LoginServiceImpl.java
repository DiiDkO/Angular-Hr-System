package com.example.test.services.impl;

import com.example.test.dtos.LoginDto;
import com.example.test.exceptions.UserNotFoundException;
import com.example.test.models.Group;
import com.example.test.models.Role;
import com.example.test.models.User;
import com.example.test.repositories.GroupRepository;
import com.example.test.repositories.RoleRepository;
import com.example.test.repositories.UserRepository;
import com.example.test.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Component
public class LoginServiceImpl  implements LoginService {
    private UserRepository userRepository;
    private GroupRepository groupRepository;
    private RoleRepository roleRepository;
    @Autowired
    public LoginServiceImpl(UserRepository userRepository,  GroupRepository groupRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.roleRepository = roleRepository;
    }
    @Override
    public LoginDto login(String username, String password) {
        boolean isValid  = false;
        BCryptPasswordEncoder bCryptPasswordEncoder =  new BCryptPasswordEncoder();
        User user = userRepository.findByUsername(username).orElseThrow(getUserNotFoundExceptionSupplier());
        isValid = bCryptPasswordEncoder.matches(password, user.getPassword());
        if(!isValid)
            throw new UserNotFoundException("Username/password is invalid !");

        List<Group> groups = groupRepository.findAllByUsers_Username(user.getUsername());
        List<String> roles = roleRepository.findAllByGroups_IdIn(groups
                .stream()
                .map(Group::getId)
                .collect(Collectors.toList()))
                .stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new LoginDto(user.getId(),username, password,roles, isValid);
    }

    private Supplier<UserNotFoundException> getUserNotFoundExceptionSupplier() {
        return () -> new UserNotFoundException("Username or password are invalid !");
    }
}
