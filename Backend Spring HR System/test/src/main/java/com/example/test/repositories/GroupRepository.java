package com.example.test.repositories;

import com.example.test.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findAllByUsers_Username(String username);
    @Transactional
    @Modifying
    @Query(value="delete from groups_roles groupRoles where groupRoles.groups_id= :groupId", nativeQuery = true)
    void deleteGroupRoleRelation(@Param("groupId") Long groupId);

    @Transactional
    @Modifying
    @Query(value="delete from users_groups userGroup where userGroup.groups_id= :groupId", nativeQuery = true)
    void deleteUserGroupRelation(@Param("groupId") Long groupId);
 }
