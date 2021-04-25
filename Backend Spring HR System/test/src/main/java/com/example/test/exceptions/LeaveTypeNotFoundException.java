package com.example.test.exceptions;

public class LeaveTypeNotFoundException extends NotFoundException{
    public LeaveTypeNotFoundException(String message) {
        super(message);
    }

    public LeaveTypeNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }
}
