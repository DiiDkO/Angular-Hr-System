package com.example.test.controllers;

import com.example.test.dtos.CreateGroupDto;

import com.example.test.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups" )
public class GroupController {

    private GroupService delegate;
    @Autowired
    public GroupController(GroupService delegate) {
        this.delegate = delegate;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public CreateGroupDto create(@RequestBody CreateGroupDto createGroupDto) {
        return delegate.create(createGroupDto);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public CreateGroupDto update(@PathVariable Long id, @RequestBody CreateGroupDto createGroupDto) {
        return delegate.update(id, createGroupDto);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/create/group_role/{roleId}/{groupId}")
    public CreateGroupDto createRole(@PathVariable Long roleId, @PathVariable Long groupId) {
        return delegate.createRole(roleId, groupId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/delete/group_role/{roleId}/{groupId}")
    public CreateGroupDto deleteRole(@PathVariable Long roleId, @PathVariable Long groupId) {
        return delegate.deleteRole(roleId, groupId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        delegate.delete(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping( "/{id}")
    public CreateGroupDto getById(@PathVariable Long id) {
        return delegate.getById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<CreateGroupDto> getAll() {
        return delegate.getAll();
    }
}
