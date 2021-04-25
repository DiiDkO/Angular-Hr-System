package com.example.test.models;

import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(name="username")
    private String username;

    @NotNull
    @Column(name="first_name")
    private String firstName;

    @NotNull
    @Column(name="middle_name")
    private String middleName;

    @NotNull
    @Column(name="last_name")
    private String lastName;

    @NotNull
    @Column(name="email")
    private String email;
    @NotNull
    @Column(name="password")
    private String password;
    @NotNull
    @Column(name="active")
    private boolean active;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "manager_id" )
    private User manager;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id" )
    private Company company;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name ="users_groups",
            joinColumns = @JoinColumn(name="users_id"),
            inverseJoinColumns = @JoinColumn(name="groups_id" )
    )
    private Set<Group> groups = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(name ="users_projects",
            joinColumns = @JoinColumn(name="users_id"),
            inverseJoinColumns = @JoinColumn(name="projects_id")
    )
    private Set<Project> projects = new HashSet<>();
    @NotNull
    @Column(name="paid_leave_days")
    private  Long paidLeaveDays;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name="requestor_id")
    private Set<LeaveRequest> leaveRequests ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public Set<LeaveRequest> getLeaveRequests() {
        return leaveRequests;
    }

    public void setLeaveRequests(Set<LeaveRequest> leaveRequests) {
        this.leaveRequests = leaveRequests;
    }
    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }
    public Long getPaidLeaveDays() {
        return paidLeaveDays;
    }

    public void setPaidLeaveDays(Long paidLeaveDays) {
        this.paidLeaveDays = paidLeaveDays;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
