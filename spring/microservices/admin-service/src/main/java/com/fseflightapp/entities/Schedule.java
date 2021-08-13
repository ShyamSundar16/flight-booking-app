package com.fseflightapp.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Schedule {

    @Id
    private String id;
    private String code;
    private String arrivalTime;
    private String departureTime;
    private int availableEconomyTickets;
    private int availableBusinessTickets;
    private Date scheduledDate;
    private String status;

    public Schedule(){}

    public Schedule(String id, String code, String arrivalTime, String departureTime, int availableEconomyTickets, int availableBusinessTickets, Date scheduledDate, String status) {
        this.id = id;
        this.code = code;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
        this.availableEconomyTickets = availableEconomyTickets;
        this.availableBusinessTickets = availableBusinessTickets;
        this.scheduledDate = scheduledDate;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public Date getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(Date scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "id='" + id + '\'' +
                ", code='" + code + '\'' +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", availableEconomyTickets=" + availableEconomyTickets +
                ", availableBusinessTickets=" + availableBusinessTickets +
                ", scheduledDate=" + scheduledDate +
                ", status='" + status + '\'' +
                '}';
    }
}
