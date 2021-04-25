package com.example.test.exceptions;

public class UserNotFoundException extends NotFoundException{
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }
}
