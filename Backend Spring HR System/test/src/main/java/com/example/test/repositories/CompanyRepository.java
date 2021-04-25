package com.example.test.repositories;

import com.example.test.models.Company;
import com.example.test.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
