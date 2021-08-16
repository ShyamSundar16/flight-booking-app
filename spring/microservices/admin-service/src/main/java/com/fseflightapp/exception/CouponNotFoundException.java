package com.fseflightapp.exception;

public class CouponNotFoundException extends Exception {

	public CouponNotFoundException() {}
	public CouponNotFoundException(String m) {
		super(m);
	}
	public CouponNotFoundException(Exception e) {
		super(e);
	}
	public CouponNotFoundException(String m, Exception e) {
		super(m, e);
	}
	
}
