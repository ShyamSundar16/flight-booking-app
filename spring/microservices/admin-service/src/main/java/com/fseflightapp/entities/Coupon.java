package com.fseflightapp.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Coupon {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  int id;

    private String code;
    private String couponValue;
    private String status;
    private Date validTill;

    public Coupon(){}

    public Coupon(int id, String code, String couponValue, String status, Date validTill) {
        this.id = id;
        this.code = code;
        this.couponValue = couponValue;
        this.status = status;
        this.validTill = validTill;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCouponValue() {
        return couponValue;
    }

    public void setCouponValue(String couponValue) {
        this.couponValue = couponValue;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getValidTill() {
        return validTill;
    }

    public void setValidTill(Date validTill) {
        this.validTill = validTill;
    }

    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", couponValue='" + couponValue + '\'' +
                ", status='" + status + '\'' +
                ", validTill=" + validTill +
                '}';
    }
}
