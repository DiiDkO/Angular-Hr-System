package com.example.test.controllers;

import com.example.test.dtos.CreateRoleDto;
import com.example.test.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/roles" )
public class RoleController {
    private RoleService delegate;

    @Autowired
    public RoleController(RoleService delegate) {this.delegate = delegate;}
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public CreateRoleDto create(@RequestBody CreateRoleDto createRoleDto) {
        return delegate.create(createRoleDto);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public CreateRoleDto update(@PathVariable Long id, @RequestBody CreateRoleDto createRoleDto) {
        return delegate.update(id, createRoleDto);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping( "/{id}" )
    public CreateRoleDto getById(@PathVariable( "id" ) Long id) {
        return delegate.getById(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        delegate.delete(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<CreateRoleDto> getAll() {
        return delegate.getAll();
    }
}
