package com.backend.libraryapi.exception.custom;

import org.springframework.validation.BindingResult;

import com.backend.libraryapi.exception.custom.response.FieldError;

public class FieldErrorException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = -209427971747220747L;
	
	private FieldError fieldError ;
	
	
	public FieldErrorException(BindingResult bindingResult) {
		fieldError = new FieldError();
		for (var error : bindingResult.getFieldErrors()) {
			fieldError.addError(error.getField(), error.getDefaultMessage());
		}
		
		System.out.println(fieldError);
	}
	
	public FieldErrorException(String key, String message) {
		fieldError = new FieldError();
		fieldError.addError(key, message);
	}

	public FieldError getFieldError() {
		return fieldError;
	}

}
