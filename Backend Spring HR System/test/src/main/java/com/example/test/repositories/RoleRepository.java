package com.example.test.repositories;

import com.example.test.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findAllByGroups_IdIn(List<Long> ids);
    @Transactional
    @Modifying
    @Query(value="delete from groups_roles groupRoles where groupRoles.roles_id= :roleId", nativeQuery = true)
    void deleteGroupRoleRelation(@Param("roleId") Long roleId);
}
