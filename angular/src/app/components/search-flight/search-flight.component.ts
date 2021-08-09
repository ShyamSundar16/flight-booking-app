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
  selectedOnwordFlight: Flight = new Flight;


  returnSource: string = "";
  returnDestination: string = "";
  dateOfReturnJourney: Date = new Date();
  roundTrip: boolean = false;
  filteredReturnFlights: Flight[] = [];
  returnFlightsBasedOnSchedule: Flight[] = [];
  showReturnSearchTable: boolean = false;
  selectedReturnFlight: Flight = new Flight;

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
    this.flightsBasedOnSchedule = [];
    this.returnFlightsBasedOnSchedule = [];
    this.showSearchTable = true;
    this.flightService.getAllFlights()
      .subscribe((res: any) => {
        this.filteredFlights = res;
        this.filteredReturnFlights = res;
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

                this.filteredFlights.forEach(flight => {
                  if (flight.code == schedule.code) {
                    flight.arrivalTime = schedule.arrivalTime;
                    flight.depatureTime = schedule.depatureTime;
                    flight.status = schedule.status;
                    flight.dateOfDepature = schedule.scheduledDate;
                    this.flightsBasedOnSchedule.push(flight);

                  }
                })
              }
            });

          })
        if (this.roundTrip) {
          this.showReturnSearchTable = true;
          this.filteredReturnFlights = this.filteredReturnFlights.filter(flight =>
            flight.from == this.destination && flight.to == this.source)
          this.scheduleService.getScheduleInfo()
            .subscribe((res: any) => {
              let schedules: Schedule[] = res;
              let doj: string = this.dateOfReturnJourney + "";
              let matchDate: string = ";"
              schedules.forEach(schedule => {
                let schDate: string[] = [];
                schDate = schedule.scheduledDate.split("/");
                matchDate = schDate[2] + "-" + schDate[1] + "-" + schDate[0];
                if (matchDate == doj) {
                  this.filteredReturnFlights.forEach(flight => {
                    if (flight.code == schedule.code) {
                      flight.arrivalTime = schedule.arrivalTime;
                      flight.depatureTime = schedule.depatureTime;
                      flight.status = schedule.status;
                      flight.dateOfDepature = schedule.scheduledDate;
                      this.returnFlightsBasedOnSchedule.push(flight);

                    }
                  })
                }
              });

            })
        }
      })
  }

  bookFlight() {
    sessionStorage.OnwardFlight = JSON.stringify( this.selectedOnwordFlight);
    if (this.roundTrip) {
      sessionStorage.roundTrip = this.roundTrip;
      sessionStorage.ReturnFlight = JSON.stringify(this.selectedReturnFlight);
    }
    this.router.navigate(["bookTicket"]);
  }


  setOneWayTrip() {
    this.roundTrip = false;
  }
  setRoundWayTrip() {
    this.roundTrip = true;

  }


  updateReturnDate(e: any) {
    this.dateOfReturnJourney = e.target.value
  }

  viewReturnSearchResults() {
    return this.showReturnSearchTable;
  }

  addOnwardFlight(flight: Flight) {
    this.selectedOnwordFlight = flight;
  }

  addReturnFlight(flight: Flight) {
    this.selectedReturnFlight = flight;
  }


}
