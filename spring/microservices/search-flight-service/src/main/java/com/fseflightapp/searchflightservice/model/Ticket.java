package com.fseflightapp.searchflightservice.model;


public class Ticket {

    private String id;
    private String pnr;
    private String flightCode;
    private String bookedBy;
    private int numberOfPassesngers;
    private String source;
    private String destination;
    private String dateOfJourney;
    private String arrivalTime;
    private String departureTime;
    private int amountPaid;
    private String status;
    private String passesngers;

    public Ticket() {
    }

    public Ticket(String id, String pnr, String flightCode, String bookedBy, int numberOfPassesngers, String passesngers, String source, String destination, String dateOfJourney, String arrivalTime, String departureTime, int amountPaid, String status) {
        this.id = id;
        this.pnr = pnr;
        this.flightCode = flightCode;
        this.bookedBy = bookedBy;
        this.numberOfPassesngers = numberOfPassesngers;
        this.passesngers = passesngers;
        this.source = source;
        this.destination = destination;
        this.dateOfJourney = dateOfJourney;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
        this.amountPaid = amountPaid;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPnr() {
        return pnr;
    }

    public void setPnr(String pnr) {
        this.pnr = pnr;
    }

    public String getFlightCode() {
        return flightCode;
    }

    public void setFlightCode(String flightCode) {
        this.flightCode = flightCode;
    }

    public String getBookedBy() {
        return bookedBy;
    }

    public void setBookedBy(String bookedBy) {
        this.bookedBy = bookedBy;
    }

    public int getNumberOfPassesngers() {
        return numberOfPassesngers;
    }

    public void setNumberOfPassesngers(int numberOfPassesngers) {
        this.numberOfPassesngers = numberOfPassesngers;
    }

    public String getPassesngers() {
        return passesngers;
    }

    public void setPassesngers(String passesngers) {
        this.passesngers = passesngers;
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

    public String getDateOfJourney() {
        return dateOfJourney;
    }

    public void setDateOfJourney(String dateOfJourney) {
        this.dateOfJourney = dateOfJourney;
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

    public int getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(int amountPaid) {
        this.amountPaid = amountPaid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id='" + id + '\'' +
                ", pnr='" + pnr + '\'' +
                ", flightCode='" + flightCode + '\'' +
                ", bookedBy='" + bookedBy + '\'' +
                ", numberOfPassesngers=" + numberOfPassesngers +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", dateOfJourney='" + dateOfJourney + '\'' +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", amountPaid=" + amountPaid +
                ", status='" + status + '\'' +
                ", passesngers='" + passesngers + '\'' +
                '}';
    }

    //    @Override
//    public String toString() {
//        return "Ticket{" +
//                "\"id\"" +": \""+ id + "\"," +
//                "\"pnr\"" +": \""+ pnr + "\"," +
//                "\"flightCode\"" +": \""+ flightCode + "\"," +
//                "\"bookedBy\"" +": \""+ bookedBy + "\"," +
//                "\"numberOfPassesngers\"" +": "+ numberOfPassesngers + "," +
//                "\"amountPaid\"" +": "+ amountPaid + "," +
//                "\"source\"" +": \""+ source + "\"," +
//                "\"destination\"" +": \""+ destination + "\"," +
//                "\"dateOfJourney\"" +": \""+ dateOfJourney + "\"," +
//                "\"arrivalTime\"" +": \""+ arrivalTime + "\"," +
//                "\"departureTime\"" +": \""+ departureTime + "\"," +
//                "\"status\"" +": \""+ status + "\"," +
//                "}";
//    }
}
