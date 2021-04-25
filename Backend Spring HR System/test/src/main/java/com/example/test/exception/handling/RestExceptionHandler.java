package com.example.test.exception.handling;

import com.example.test.exceptions.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger EXCEPTION_LOGGER = LoggerFactory.getLogger(RestExceptionHandler.class);

    @ExceptionHandler( {NotFoundException.class, UserNotFoundException.class, GroupNotFoundException.class, RoleNotFoundException.class, LeaveTypeNotFoundException.class, LeaveRequestNotFoundException.class} )
    public ResponseEntity<RestApiError> handleNotFound(Exception exception) {
        logException(exception);
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(RestApiError.builder()
                        .type(exception.getClass().getSimpleName())
                        .message(exception.getMessage()).build());
    }
    @ExceptionHandler( {ConflictException.class})
    public ResponseEntity<RestApiError> handleConflict(Exception exception) {
        logException(exception);
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(RestApiError.builder()
                        .type(exception.getClass().getSimpleName())
                        .message(exception.getMessage()).build());
    }
    private static void logException(Throwable t) {
        EXCEPTION_LOGGER.error("An error has occurred while serving REST request", t);
    }
}
