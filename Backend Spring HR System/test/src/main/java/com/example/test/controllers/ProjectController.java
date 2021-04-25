package com.example.test.controllers;

import com.example.test.dtos.CreateProjectDto;
import com.example.test.dtos.CreateRoleDto;
import com.example.test.services.ProjectService;
import com.example.test.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping( "/projects" )
public class ProjectController {
        private ProjectService delegate;

        @Autowired
        public ProjectController(ProjectService delegate) {this.delegate = delegate;}
        @CrossOrigin(origins = "http://localhost:4200")
        @PostMapping
        public CreateProjectDto create(@RequestBody CreateProjectDto createProjectDto) {
            return delegate.create(createProjectDto);
        }
        @CrossOrigin(origins = "http://localhost:4200")
        @PutMapping("/{id}")
        public CreateProjectDto update(@PathVariable Long id, @RequestBody CreateProjectDto createProjectDto) {
            return delegate.update(id, createProjectDto);
        }
        @CrossOrigin(origins = "http://localhost:4200")
        @GetMapping( "/{id}" )
        public CreateProjectDto getById(@PathVariable( "id" ) Long id) {
            return delegate.getById(id);
        }
        @CrossOrigin(origins = "http://localhost:4200")
        @DeleteMapping("/{id}")
        public void delete(@PathVariable("id") Long id) {
            delegate.delete(id);
        }
        @CrossOrigin(origins = "http://localhost:4200")
        @GetMapping
        public List<CreateProjectDto> getAll() {
            return delegate.getAll();
        }
}
