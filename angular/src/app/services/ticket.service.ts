import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http/";
import { Ticket } from "../models/Ticket";

@Injectable()
export class TicketService {
    private url: string = "http://localhost:3000/tickets";
    private t = new Ticket();

    public set ticket(newT: Ticket) {
        this.t.id = newT.pnr;
        this.t.pnr = newT.pnr;
        this.t.flightCode = newT.flightCode;
        this.t.bookedBy = newT.bookedBy;
        this.t.from = newT.from;
        this.t.to = newT.to;
        this.t.arrivalTime = newT.arrivalTime;
        this.t.departureTime = newT.departureTime;
        this.t.dateOfJourney = newT.dateOfJourney;
        this.t.numberOfPassesngers = newT.numberOfPassesngers;
        this.t.passesngers = newT.passesngers;
        this.t.amountPaid = newT.amountPaid;
        this.t.status = newT.status;
    }

    public get ticket() {
        return this.t;
    }
    constructor(private httpClient: HttpClient) {
    }
    getAllTickets() {
        return this.httpClient.get(this.url);
    }

    saveTickets(ticket: Ticket) {
        return this.httpClient.post(this.url, ticket);
    }

    deleteTicket(id: number) {
        return this.httpClient.delete(this.url + "/" + id);
    }

    updateTicket(ticket: Ticket) {
        return this.httpClient.put(this.url + "/" + ticket.id, ticket);
    }
}