package com.example.test.repositories;

import com.example.test.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findAllByGroups_IdIn(List<Long> ids);
}
