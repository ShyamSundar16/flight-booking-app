import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http/";
import { Flight } from "../models/Flight";

// @Injectable({ "providedIn": "root", })
@Injectable()
export class FlightService {
    private url: string = "http://localhost:3000/flights";
    private f = new Flight();

    public set flight(newF: Flight) {
        this.f.id = newF.id;
        this.f.code = newF.code;
        this.f.airlines = newF.airlines;
        this.f.availableclass = newF.availableclass;
        this.f.runson = newF.runson;
        this.f.from = newF.from;
        this.f.to = newF.to;
        this.f.contact = newF.contact;
        this.f.status = newF.status;

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