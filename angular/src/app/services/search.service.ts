import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http/";
import { Flight } from "../models/Flight";

@Injectable()
export class SearchService {
    private url: string = "http://localhost:8989/api/bookflights/searchFlight";

    constructor(private httpClient: HttpClient) {
    }

    filterFlights(source:string, destination:string, doj:string){
        return this.httpClient.get(this.url+"/filter?source="+source+"&destination="+destination+"&doj="+doj);
    }
}