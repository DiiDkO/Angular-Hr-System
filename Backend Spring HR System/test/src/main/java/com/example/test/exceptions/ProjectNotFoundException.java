package com.example.test.exceptions;

public class ProjectNotFoundException extends NotFoundException{
    public ProjectNotFoundException(String message) {
        super(message);
    }
    public ProjectNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }
}
