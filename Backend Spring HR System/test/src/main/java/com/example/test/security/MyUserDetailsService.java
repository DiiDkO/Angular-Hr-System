package com.example.test.security;

import com.example.test.models.Group;
import com.example.test.models.Role;
import com.example.test.models.User;
import com.example.test.repositories.GroupRepository;
import com.example.test.repositories.RoleRepository;
import com.example.test.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Not Found" + username));
        List<Group> groups = groupRepository.findAllByUsers_Username(user.getUsername());
        List<Role> roles = roleRepository.findAllByGroups_IdIn(groups.stream().map(Group::getId).collect(Collectors.toList()));
        return new MyUserDetails(user, roles);
    }
}
