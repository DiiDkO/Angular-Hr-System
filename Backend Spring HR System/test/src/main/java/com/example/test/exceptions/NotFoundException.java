package com.example.test.exceptions;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message){
        super(message);
    }
    public NotFoundException(String message,Throwable exception){
        super(message,exception);
    }

}
