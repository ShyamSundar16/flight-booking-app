package com.fseflightapp.entities;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ExceptionMessage {

	private String message;
	private LocalDateTime dt;
	private HttpStatus status;

	
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public LocalDateTime getDt() {
		return dt;
	}
	public void setDt(LocalDateTime dt) {
		this.dt = dt;
	}
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	
	public ExceptionMessage(String message, HttpStatus status) {
		super();
		this.message = message;
		this.dt = LocalDateTime.now();
		this.status = status;
	}

//	@Override
//	public String toString() {
//		return "ExceptionMessage [message=" + message + ", dt=" + dt + ", status=" + status + ", som=" + som + "]";
//	}


	@Override
	public String toString() {
		return "ExceptionMessage{" +
				"message='" + message + '\'' +
				", dt=" + dt +
				", status=" + status +
				'}';
	}
}
