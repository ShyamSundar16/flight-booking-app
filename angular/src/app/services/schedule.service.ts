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
        this.s.depatureTime = newS.depatureTime;
        this.s.status = newS.status;

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
        return this.httpClient.post(this.url, schedule);
    }

    deleteSchedule(id: number) {
        return this.httpClient.delete(this.url + "/" + id);
    }
    updateSchedule(schedule: Schedule) {
        return this.httpClient.put(this.url + "/" + schedule.id, schedule);
    }
}