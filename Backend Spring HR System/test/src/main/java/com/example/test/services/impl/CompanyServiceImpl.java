package com.example.test.services.impl;

import com.example.test.dtos.CreateCompanyDto;
import com.example.test.exceptions.CompanyNotFoundException;
import com.example.test.exceptions.RoleNotFoundException;
import com.example.test.mappers.CompanyMapper;
import com.example.test.models.Company;
import com.example.test.repositories.CompanyRepository;
import com.example.test.repositories.UserRepository;
import com.example.test.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Component
public class CompanyServiceImpl implements CompanyService {
    private CompanyRepository companyRepository;
    private CompanyMapper companyMapper;
    private UserRepository userRepository;
    @Autowired
    public CompanyServiceImpl(CompanyRepository companyRepository, CompanyMapper companyMapper, UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.companyMapper = companyMapper;
        this.userRepository = userRepository;
    }

    @Override
    public CreateCompanyDto create(CreateCompanyDto createCompanyDto) {
        return companyMapper.toDto(companyRepository.save(companyMapper.fromDto(createCompanyDto)));
    }

    @Override
    public CreateCompanyDto update(Long id, CreateCompanyDto createCompanyDto) {
        createCompanyDto.setId(id);
        if(companyRepository.findById(id).isEmpty())
            throw getCompanyNotFoundExceptionSupplier(id).get();
        return companyMapper.toDto(companyRepository.save(companyMapper.fromDto(createCompanyDto)));
    }

    @Override
    public void delete(Long id) {
        if(companyRepository.findById(id).isEmpty())
            throw getCompanyNotFoundExceptionSupplier(id).get();
        userRepository.updateAllUsersWithCompanyId(id);
        companyRepository.deleteById(id);
    }

    @Override
    public CreateCompanyDto getById(Long id) {
        Company company = companyRepository.findById(id).orElseThrow(getCompanyNotFoundExceptionSupplier(id));
        return companyMapper.toDto(company);
    }

    @Override
    public List<CreateCompanyDto> getAll() {
        return companyRepository.findAll()
                .stream()
                .map(companyMapper::toDto)
                .collect(Collectors.toList());
    }
    private Supplier<CompanyNotFoundException> getCompanyNotFoundExceptionSupplier(Long companyId) {
        return () -> new CompanyNotFoundException(MessageFormat.format("Company with id \"{0}\" has not been found", companyId));
    }
}