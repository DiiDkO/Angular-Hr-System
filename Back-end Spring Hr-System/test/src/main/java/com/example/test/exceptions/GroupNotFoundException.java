package com.example.test.exceptions;

public class GroupNotFoundException extends NotFoundException{
    public GroupNotFoundException(String message) {
        super(message);
    }

    public GroupNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }
}
