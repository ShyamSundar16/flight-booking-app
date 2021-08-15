package com.fseflightapp.searchflightservice.model;


public class Flight {

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
    private String arrivalTime;
    private String departureTime;
    private int availableEconomyTickets;
    private int availableBusinessTickets;
    private String dateOfDepature;

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

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public int getAvailableEconomyTickets() {
        return availableEconomyTickets;
    }

    public void setAvailableEconomyTickets(int availableEconomyTickets) {
        this.availableEconomyTickets = availableEconomyTickets;
    }

    public int getAvailableBusinessTickets() {
        return availableBusinessTickets;
    }

    public void setAvailableBusinessTickets(int availableBusinessTickets) {
        this.availableBusinessTickets = availableBusinessTickets;
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

    public String getDateOfDepature() {
        return dateOfDepature;
    }

    public void setDateOfDepature(String dateOfDepature) {
        this.dateOfDepature = dateOfDepature;
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
                ", arrivalTime='" + arrivalTime + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", availableEconomyTickets=" + availableEconomyTickets +
                ", availableBusinessTickets=" + availableBusinessTickets +
                ", dateOfDepature='" + dateOfDepature + '\'' +
                '}';
    }
}
