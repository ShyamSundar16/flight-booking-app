package com.fseflightapp.config.advice;

import com.fseflightapp.entities.ExceptionMessage;
import com.fseflightapp.exception.CouponNotFoundException;
import com.fseflightapp.exception.FlightNotFoundException;
import com.fseflightapp.exception.ScheduleNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MyControllerAdvice {

	@ExceptionHandler(FlightNotFoundException.class)
	public ResponseEntity<ExceptionMessage> handleFlightException(FlightNotFoundException e) {
		return new ResponseEntity<ExceptionMessage>(new ExceptionMessage(e.getMessage(), HttpStatus.NO_CONTENT), HttpStatus.OK);
	}

	@ExceptionHandler(CouponNotFoundException.class)
	public ResponseEntity<ExceptionMessage> handleCouponException(CouponNotFoundException e) {
		return new ResponseEntity<ExceptionMessage>(new ExceptionMessage(e.getMessage(), HttpStatus.NO_CONTENT), HttpStatus.OK);
	}

	@ExceptionHandler(ScheduleNotFoundException.class)
	public ResponseEntity<ExceptionMessage> handleScheduleException(ScheduleNotFoundException e) {
		return new ResponseEntity<ExceptionMessage>(new ExceptionMessage(e.getMessage(), HttpStatus.NO_CONTENT), HttpStatus.OK);
	}

}
