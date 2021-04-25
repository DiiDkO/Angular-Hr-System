package com.example.test.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "leave_requests")

public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name="start_date")
    private Date startDate;

    @NotNull
    @Column(name = "end_date")
    private Date endDate;

    @NotNull
    @Column(name = "requested_days")
    private Long requestedDays;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "leave_type_id" )
    private LeaveType leaveType;

    @NotNull
    @Column(name = "status")
    private String status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "requestor_id" )
    private User requestor;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "approver_id" )
    private User approver;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Long getRequestedDays() {
        return requestedDays;
    }

    public void setRequestedDays(Long requestedDays) {
        this.requestedDays = requestedDays;
    }

    public LeaveType getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(LeaveType leaveType) {
        this.leaveType = leaveType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getRequestor() {
        return requestor;
    }

    public void setRequestor(User requestor) {
        this.requestor = requestor;
    }

    public User getApprover() {
        return approver;
    }

    public void setApprover(User approver) {
        this.approver = approver;
    }

    @Override
    public String toString() {
        return "LeaveRequest{" +
                "id=" + id +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", requestedDays=" + requestedDays +
                ", leaveType=" + leaveType +
                ", status='" + status + '\'' +
                ", requestor=" + requestor +
                ", approver=" + approver +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LeaveRequest that = (LeaveRequest) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
