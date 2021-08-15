import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from "rxjs/operators";
import { Flight } from 'src/app/models/Flight';
import { Schedule } from 'src/app/models/Schedule';
import { FlightService } from 'src/app/services/flight.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SearchService } from 'src/app/services/search.service';
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

  addedReturnFlight: boolean = false;
  addedOnwardFlight: boolean = false;

  constructor(public userService: UserService, public flightService: FlightService
    , public scheduleService: ScheduleService, public searchService: SearchService, private router: Router) {
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

    this.searchService.filterFlights(this.source, this.destination, this.dateOfJourney + "")
      .subscribe((res: any) => {
        console.log(res)
        this.flightsBasedOnSchedule = res;
      })

    if (this.roundTrip) {
      this.showReturnSearchTable = true;
      this.searchService.filterFlights(this.destination, this.source, this.dateOfReturnJourney + "")
        .subscribe((res: any) => {
          console.log(res)
          this.returnFlightsBasedOnSchedule = res;
        })
    }
  }

  bookFlight() {
    sessionStorage.OnwardFlight = JSON.stringify(this.selectedOnwordFlight);
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
    this.addedOnwardFlight = true;

    this.selectedOnwordFlight = flight;
  }

  addReturnFlight(flight: Flight) {
    this.addedReturnFlight = true;
    this.selectedReturnFlight = flight;
  }
  checkBeforeProceed(): boolean {
    if (this.roundTrip && this.addedReturnFlight) {
      return true;
    }
    if (!this.roundTrip && this.addedOnwardFlight) {
      return true;
    }
    return false;
  }
}
