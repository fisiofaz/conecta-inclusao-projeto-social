package com.conectainclusao.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Anotação para que o Spring retorne 404 Not Found automaticamente quando esta exceção for lançada
@ResponseStatus(value = HttpStatus.NOT_FOUND) 
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}