package com.schoolManagment.Backend.error;

import java.util.HashMap;
import java.util.Map;

import javax.validation.ValidationException;

import org.springframework.data.rest.webmvc.RepositoryRestExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fasterxml.jackson.core.JsonParseException;

@ControllerAdvice(basePackageClasses = RepositoryRestExceptionHandler.class)
public class GlobalExceptionHandler {

    @ExceptionHandler({ValidationException.class, JsonParseException.class})
    public ResponseEntity<Map<String, String>> yourExceptionHandler(Exception e) {
        Map<String, String> response = new HashMap<String, String>();
        response.put("message", "Bad Request");
        return new ResponseEntity<Map<String, String>>(response, HttpStatus.BAD_REQUEST);
    }
}