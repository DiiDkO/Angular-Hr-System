package com.example.test.repositories;

import com.example.test.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Transactional
    @Modifying
    @Query(value="delete from users_projects userProject where userProject.projects_id= :projectId", nativeQuery = true)
    void deleteUserProjectRelation(@Param("projectId") Long projectId);
}
