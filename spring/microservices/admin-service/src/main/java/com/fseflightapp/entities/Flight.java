package com.fseflightapp.entities;

import javax.persistence.*;

@Entity
public class Flight {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String code;
    private String airlines;
    private boolean businessClassAvailable;
    private boolean economyClassAvailable;
    private String businessClassPrice;
    private String economyClassPrice;
    private String runsOn;
    private String source;
    private String destination;
    private String contact;
    private String status;
    private String instrument;

    public Flight(){

    }

    public Flight(int id, String code, String airlines, boolean businessClassAvailable, boolean economyClassAvailable, String businessClassPrice, String economyClassPrice, String runsOn, String source, String destination, String contact, String status, String instrument) {
        this.id = id;
        this.code = code;
        this.airlines = airlines;
        this.businessClassAvailable = businessClassAvailable;
        this.economyClassAvailable = economyClassAvailable;
        this.businessClassPrice = businessClassPrice;
        this.economyClassPrice = economyClassPrice;
        this.runsOn = runsOn;
        this.source = source;
        this.destination = destination;
        this.contact = contact;
        this.status = status;
        this.instrument = instrument;
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

    public String getAirlines() {
        return airlines;
    }

    public void setAirlines(String airlines) {
        this.airlines = airlines;
    }

    public boolean isBusinessClassAvailable() {
        return businessClassAvailable;
    }

    public void setBusinessClassAvailable(boolean businessClassAvailable) {
        this.businessClassAvailable = businessClassAvailable;
    }

    public boolean isEconomyClassAvailable() {
        return economyClassAvailable;
    }

    public void setEconomyClassAvailable(boolean economyClassAvailable) {
        this.economyClassAvailable = economyClassAvailable;
    }

    public String getBusinessClassPrice() {
        return businessClassPrice;
    }

    public void setBusinessClassPrice(String businessClassPrice) {
        this.businessClassPrice = businessClassPrice;
    }

    public String getEconomyClassPrice() {
        return economyClassPrice;
    }

    public void setEconomyClassPrice(String economyClassPrice) {
        this.economyClassPrice = economyClassPrice;
    }

    public String getRunsOn() {
        return runsOn;
    }

    public void setRunsOn(String runsOn) {
        this.runsOn = runsOn;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    @Override
    public String toString() {
        return "Flight{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", airlines='" + airlines + '\'' +
                ", businessClassAvailable=" + businessClassAvailable +
                ", economyClassAvailable=" + economyClassAvailable +
                ", businessClassPrice='" + businessClassPrice + '\'' +
                ", economyClassPrice='" + economyClassPrice + '\'' +
                ", runsOn='" + runsOn + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", contact='" + contact + '\'' +
                ", status='" + status + '\'' +
                ", instrument='" + instrument + '\'' +
                '}';
    }
}
