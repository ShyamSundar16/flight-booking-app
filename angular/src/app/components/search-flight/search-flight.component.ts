import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from "rxjs/operators";
import { Flight } from 'src/app/models/Flight';
import { Schedule } from 'src/app/models/Schedule';
import { FlightService } from 'src/app/services/flight.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {

  source: string = "";
  destination: string = "";
  dateOfJourney: Date = new Date();
  filteredFlights: Flight[] = [];
  flightsBasedOnSchedule: Flight[] = [];
  showSearchTable: boolean = false;
  constructor(public userService: UserService, public flightService: FlightService
    , public scheduleService: ScheduleService, private router: Router) {
  }

  ngOnInit(): void {
  }

  destinations = [
    "Chennai",
    "Mumbai",
    "Pune",
    "Bangalore"
  ]
  selected = "----"

  updateSource(e: any) {
    this.source = e.target.value
  }

  updateDestination(e: any) {
    this.destination = e.target.value
  }
  updateDate(e: any) {
    this.dateOfJourney = e.target.value
  }

  viewSearchResults() {
    return this.showSearchTable;
  }
  searchFlights() {
    this.flightsBasedOnSchedule=[];
    this.showSearchTable = true;
    this.flightService.getAllFlights()
      .subscribe((res: any) => {
        this.filteredFlights = res;
        this.filteredFlights = this.filteredFlights.filter(flight => flight.from == this.source && flight.to == this.destination)
       
        this.scheduleService.getScheduleInfo()
          .subscribe((res: any) => {
            let schedules: Schedule[] = res;
            let doj: string = this.dateOfJourney + "";
            let matchDate: string = ";"

            schedules.forEach(schedule => {
              let schDate: string[] = [];
              schDate = schedule.scheduledDate.split("/");
              matchDate = schDate[2] + "-" + schDate[1] + "-" + schDate[0];
              if (matchDate == doj) {
                let item1:Flight = <Flight>this.filteredFlights.find(i => i.code === schedule.code);
                item1.arrivalTime=schedule.arrivalTime;
                item1.depatureTime=schedule.depatureTime;
                item1.status=schedule.status;
                item1.dateOfDepature=schedule.scheduledDate;
                this.flightsBasedOnSchedule.push(item1);
              }
            });
          })
      })
  }

  bookFlight(flight: Flight) {
    this.flightService.flight = flight;
    this.router.navigate(["bookTicket"]);
  }

}
