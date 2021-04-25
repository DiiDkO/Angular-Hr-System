package com.example.test.services;

import com.example.test.dtos.CreateCompanyDto;
import com.example.test.dtos.CreateProjectDto;

import java.util.List;

public interface CompanyService {
    CreateCompanyDto create(CreateCompanyDto createCompanyDto);
    CreateCompanyDto update(Long id, CreateCompanyDto createCompanyDto);
    void delete(Long id);
    CreateCompanyDto getById(Long id);
    List<CreateCompanyDto> getAll();
}
