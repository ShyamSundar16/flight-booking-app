import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http/";
import { Flight } from "../models/Flight";

@Injectable()
export class FlightService {
    private url: string = "http://ec2-52-14-234-157.us-east-2.compute.amazonaws.com:8989/api/admin/flights";
    private f = new Flight();

    public set flight(newF: Flight) {
        this.f.id = newF.id;
        this.f.code = newF.code;
        this.f.airlines = newF.airlines;
        this.f.instrument = newF.instrument;
        this.f.businessClassAvailable = newF.businessClassAvailable;
        this.f.availableBusinessTickets = newF.availableBusinessTickets;
        this.f.economyClassAvailable = newF.economyClassAvailable;
        this.f.availableEconomyTickets = newF.availableEconomyTickets;
        this.f.businessClassPrice = newF.businessClassPrice;
        this.f.economyClassPrice = newF.economyClassPrice;
        this.f.runsOn = newF.runsOn;
        this.f.source = newF.source;
        this.f.destination = newF.destination;
        this.f.contact = newF.contact;
        this.f.status = newF.status;
        this.f.arrivalTime = newF.arrivalTime;
        this.f.departureTime = newF.departureTime;
        this.f.dateOfDepature = newF.dateOfDepature;

    }

    public get flight() {
        return this.f;
    }
    constructor(private httpClient: HttpClient) {
    }
    getAllFlights() {
        return this.httpClient.get(this.url);
    }

    saveFlights(flight: Flight) {
        return this.httpClient.post(this.url, flight);
    }

    deleteFlight(id: number) {
        return this.httpClient.delete(this.url + "/" + id);
    }

    updateFlight(flight: Flight) {
        return this.httpClient.put(this.url + "/" + flight.id, flight);
    }
}