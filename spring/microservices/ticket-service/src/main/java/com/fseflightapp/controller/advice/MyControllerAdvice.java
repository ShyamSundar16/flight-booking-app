package com.fseflightapp.controller.advice;

import com.fseflightapp.entities.ExceptionMessage;
import com.fseflightapp.exception.TicketNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MyControllerAdvice {

	@ExceptionHandler(TicketNotFoundException.class)
	public ResponseEntity<ExceptionMessage> handleTicketException(TicketNotFoundException e) {
		return new ResponseEntity<ExceptionMessage>(new ExceptionMessage(e.getMessage(), HttpStatus.NO_CONTENT), HttpStatus.OK);
	}


}
