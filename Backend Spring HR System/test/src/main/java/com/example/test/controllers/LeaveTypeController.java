package com.example.test.controllers;

import com.example.test.dtos.CreateLeaveTypeDto;
import com.example.test.services.LeaveTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping( "/leave_types" )
public class LeaveTypeController {
    private LeaveTypeService delegate;

    @Autowired
    public LeaveTypeController(LeaveTypeService delegate) {
        this.delegate = delegate;
    }

    @CrossOrigin( origins = "http://localhost:4200" )
    @PostMapping
    public CreateLeaveTypeDto create(@RequestBody CreateLeaveTypeDto createLeaveTypeDto) {
        return delegate.create(createLeaveTypeDto);
    }

    @CrossOrigin( origins = "http://localhost:4200" )
    @PutMapping( "/{id}" )
    public CreateLeaveTypeDto update(@PathVariable Long id, @RequestBody CreateLeaveTypeDto createLeaveTypeDto) {
        return delegate.update(id, createLeaveTypeDto);
    }

    @CrossOrigin( origins = "http://localhost:4200" )
    @GetMapping( "/{id}" )
    public CreateLeaveTypeDto getById(@PathVariable( "id" ) Long id) {
        return delegate.getById(id);
    }

    @CrossOrigin( origins = "http://localhost:4200" )
    @DeleteMapping( "/{id}" )
    public void delete(@PathVariable( "id" ) Long id) {
        delegate.delete(id);
    }

    @CrossOrigin( origins = "http://localhost:4200" )
    @GetMapping
    public List<CreateLeaveTypeDto> getAll() {
        return delegate.getAll();
    }
}
