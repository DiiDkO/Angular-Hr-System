package com.example.test.repositories;

import com.example.test.models.Company;
import com.example.test.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameAndPassword(String username, String password);
    @Transactional
    @Modifying
    @Query("UPDATE User user SET user.company.id = null WHERE user.company.id = :companyId")
    void updateAllUsersWithCompanyId(@Param("companyId") Long companyId);

    @Transactional
    @Modifying
    @Query(value="delete from users_groups userGroup where userGroup.users_id= :userId", nativeQuery = true)
    void deleteUserGroupRelation(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query(value="delete from users_projects userProject where userProject.users_id= :userId", nativeQuery = true)
    void deleteUserProjectRelation(@Param("userId") Long userId);
}
