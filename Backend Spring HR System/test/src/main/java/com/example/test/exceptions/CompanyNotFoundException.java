package com.example.test.exceptions;

public class CompanyNotFoundException extends NotFoundException{
    public CompanyNotFoundException(String message) {
        super(message);
    }

    public CompanyNotFoundException(String message, Throwable exception) {
        super(message, exception);
    }
}