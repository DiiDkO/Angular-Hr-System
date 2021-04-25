package com.example.test.exceptions;

public class LeaveRequestNotFoundException extends NotFoundException {
    public LeaveRequestNotFoundException(String message) {
        super(message);
    }

    public LeaveRequestNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }
}
