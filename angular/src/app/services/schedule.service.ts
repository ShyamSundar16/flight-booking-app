import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http/";
import { Schedule } from "../models/Schedule";

@Injectable()
export class ScheduleService {
    private url: string = "http://localhost:3000/schedule";
    private s = new Schedule();

    public set schedule(newS: Schedule) {
        this.s.id = newS.id;
        this.s.code = newS.code;
        this.s.scheduledDate = newS.scheduledDate;
        this.s.arrivalTime = newS.arrivalTime;
        this.s.departureTime = newS.departureTime;
        this.s.status = newS.status;
        this.s.availableBusinessTickets = newS.availableBusinessTickets;
        this.s.availableEconomyTickets = newS.availableEconomyTickets;


    }

    public get schedule() {
        return this.s;
    }
    constructor(private httpClient: HttpClient) {
    }
    getScheduleInfo() {
        return this.httpClient.get(this.url);
    }

    saveSchedule(schedule: Schedule) {
        let keyConstruct:string[]=schedule.scheduledDate.split("/");
        schedule.id =schedule.code+"_"+keyConstruct[0]+"_"+keyConstruct[1]+"_"+[2]+"_"+schedule.arrivalTime;
        return this.httpClient.post(this.url, schedule);
    }

    deleteSchedule(id: string) {
        return this.httpClient.delete(this.url + "/" + id);
    }
    updateSchedule(schedule: Schedule) {
        return this.httpClient.put(this.url + "/" + schedule.id, schedule);
    }
}