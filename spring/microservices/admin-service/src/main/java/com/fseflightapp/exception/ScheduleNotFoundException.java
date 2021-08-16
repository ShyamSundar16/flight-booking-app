package com.fseflightapp.exception;

public class ScheduleNotFoundException extends Exception {

	public ScheduleNotFoundException() {}
	public ScheduleNotFoundException(String m) {
		super(m);
	}
	public ScheduleNotFoundException(Exception e) {
		super(e);
	}
	public ScheduleNotFoundException(String m, Exception e) {
		super(m, e);
	}
	
}
