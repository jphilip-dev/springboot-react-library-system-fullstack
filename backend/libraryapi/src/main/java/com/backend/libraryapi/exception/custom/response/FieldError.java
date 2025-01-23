package com.backend.libraryapi.exception.custom.response;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class FieldError {
	
	Map<String, String> errors = new HashMap<String, String>();
	
	public void addError(String key,String error) {
		errors.put(key, error);
	}
}
