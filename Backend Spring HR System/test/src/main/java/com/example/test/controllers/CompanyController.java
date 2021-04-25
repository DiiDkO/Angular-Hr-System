package com.example.test.controllers;

import com.example.test.dtos.CreateCompanyDto;
import com.example.test.dtos.CreateProjectDto;
import com.example.test.services.CompanyService;
import com.example.test.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/companies" )
public class CompanyController {
    private CompanyService delegate;

    @Autowired
    public CompanyController(CompanyService delegate) {this.delegate = delegate;}
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public CreateCompanyDto create(@RequestBody CreateCompanyDto createCompanyDto) {
        return delegate.create(createCompanyDto);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public CreateCompanyDto update(@PathVariable Long id, @RequestBody CreateCompanyDto createCompanyDto) {
        return delegate.update(id, createCompanyDto);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping( "/{id}" )
    public CreateCompanyDto getById(@PathVariable( "id" ) Long id) {
        return delegate.getById(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        delegate.delete(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<CreateCompanyDto> getAll() {
        return delegate.getAll();
    }
}
