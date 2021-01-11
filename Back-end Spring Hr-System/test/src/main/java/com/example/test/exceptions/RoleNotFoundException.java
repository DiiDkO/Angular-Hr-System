package com.example.test.exceptions;

public class RoleNotFoundException extends NotFoundException{
    public RoleNotFoundException(String message) {
        super(message);
    }

    public RoleNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }
}
