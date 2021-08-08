import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from "rxjs/operators";
import { Flight } from 'src/app/models/Flight';
import { FlightService } from 'src/app/services/flight.service';
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
  showSearchTable:boolean=false;
  constructor(public userService: UserService, public flightService: FlightService) {
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

  viewSearchResults(){
    return this.showSearchTable;
  }
  searchFlights() {
    this.showSearchTable=true;
    this.flightService.getAllFlights()
      .subscribe((res: any) => {
        this.filteredFlights = res;
        this.filteredFlights= this.filteredFlights.filter(flight => flight.from == this.source && flight.to == this.destination)
      })
  }

}
