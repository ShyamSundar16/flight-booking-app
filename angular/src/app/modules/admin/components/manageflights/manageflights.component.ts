import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Flight } from 'src/app/models/Flight';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-manageflights',
  templateUrl: './manageflights.component.html',
  styleUrls: ['./manageflights.component.scss']
})
export class ManageflightsComponent implements OnInit {
  addFlightForm: FormGroup;
  updateFlightForm: FormGroup;
  showAddFlightForm: boolean = false;
  showUpdateFlightForm: boolean = false;
  flights: Flight[] = [];


  constructor(public flightService: FlightService) {
    this.addFlightForm = new FormGroup({
      code: new FormControl("", [Validators.required]),
      airlines: new FormControl("", [Validators.required]),
      businessClassAvailable: new FormControl("", [Validators.required]),
      economyClassAvailable: new FormControl("", [Validators.required]),
      businessClassPrice: new FormControl("", [Validators.required]),
      economyClassPrice: new FormControl("", [Validators.required]),
      runson: new FormControl("", [Validators.required]),
      from: new FormControl("", [Validators.required]),
      to: new FormControl("", [Validators.required]),
      contact: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
    })
    this.updateFlightForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      code: new FormControl("", [Validators.required]),
      airlines: new FormControl("", [Validators.required]),
      businessClassAvailable: new FormControl("", [Validators.required]),
      economyClassAvailable: new FormControl("", [Validators.required]),
      businessClassPrice: new FormControl("", [Validators.required]),
      economyClassPrice: new FormControl("", [Validators.required]),
      runson: new FormControl("", [Validators.required]),
      from: new FormControl("", [Validators.required]),
      to: new FormControl("", [Validators.required]),
      contact: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
    })
    this.findAllFlights();
  }


  ngOnInit(): void {
  }

  showAddForm() {
    this.showAddFlightForm = true;
  }
  showUpdateForm(flight: Flight) {
    this.updateFlightForm.setValue(flight)
    this.showUpdateFlightForm = true;
  }

  cancelAddForm() {
    this.showAddFlightForm = false;
  }

  cancelUpdateForm() {
    this.showUpdateFlightForm = false;
  }
  findAllFlights() {
    this.flightService.getAllFlights()
      .subscribe((res: any) => {
        this.flights = res;
      })
  }

  addFlight() {
    this.flightService.saveFlights(this.addFlightForm.value)
      .subscribe((res: any) => {
        this.addFlightForm.reset();
        this.showAddFlightForm = false;
        this.findAllFlights();
      });
  }

  modifyFlight() {
    this.flightService.updateFlight(this.updateFlightForm.value)
      .subscribe((res: any) => {
        this.showUpdateFlightForm = false;
        this.findAllFlights()
      });
  }
  deleteFlightById(id: number) {
    this.flightService.deleteFlight(id)
      .subscribe((res: any) => {
        this.findAllFlights()
      });
  }

}
