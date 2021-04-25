package com.example.test.exceptions;


public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }

    public ConflictException(String message, Throwable exception) {
        super(message, exception);
    }
}
