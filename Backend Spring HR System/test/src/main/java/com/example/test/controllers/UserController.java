package com.example.test.controllers;

import com.example.test.dtos.CreateUserDto;
import com.example.test.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/users" )
public class UserController {

    private UserService delegate;

    @Autowired
    public UserController(UserService delegate) {
        this.delegate = delegate;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public CreateUserDto create(@RequestBody CreateUserDto createUserDto) {
        return delegate.create(createUserDto);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public CreateUserDto update(@PathVariable Long id, @RequestBody CreateUserDto createUserDto) {
        return delegate.update(id, createUserDto);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/group_joiner/{userId}/{groupId}")
    public CreateUserDto joinGroup(@PathVariable Long userId, @PathVariable Long groupId) {
        return delegate.joinGroup(userId, groupId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/group_leaver/{userId}/{groupId}")
    public CreateUserDto leave(@PathVariable Long userId, @PathVariable Long groupId) {
        return delegate.leaveGroup(userId, groupId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/project_joiner/{userId}/{projectId}")
    public CreateUserDto joinProject(@PathVariable Long userId, @PathVariable Long projectId) {
        return delegate.joinProject(userId, projectId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/project_leaver/{userId}/{projectId}")
    public CreateUserDto leaveProject(@PathVariable Long userId, @PathVariable Long projectId) {
        return delegate.leaveProject(userId, projectId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public CreateUserDto getById(@PathVariable( "id" ) Long id) {
        return delegate.getById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        delegate.delete(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<CreateUserDto> getAll() {
        return delegate.getAll();
    }



}
