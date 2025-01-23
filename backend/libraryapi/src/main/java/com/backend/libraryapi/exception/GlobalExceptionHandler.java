package com.backend.libraryapi.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.backend.libraryapi.exception.custom.FieldErrorException;
import com.backend.libraryapi.exception.custom.response.FieldError;


@ControllerAdvice
public class GlobalExceptionHandler {
	
	 @ExceptionHandler(FieldErrorException.class)
	    public ResponseEntity<FieldError> handleValidationExceptions(FieldErrorException ex) {
	        // Get the first validation error message
	       	        
	        return new ResponseEntity<>(ex.getFieldError(), HttpStatus.BAD_REQUEST);
	    }
}
