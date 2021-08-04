import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {

  constructor() {
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

  update(e: any) {
    this.selected = e.target.value
  }

}
