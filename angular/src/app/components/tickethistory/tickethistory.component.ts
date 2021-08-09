import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Passenger } from 'src/app/models/Passenger';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-tickethistory',
  templateUrl: './tickethistory.component.html',
  styleUrls: ['./tickethistory.component.scss']
})
export class TickethistoryComponent implements OnInit {

  tickets: Ticket[] = []
  passengers: Passenger[] = []
  viewPassengersForm: FormGroup;
  showViewPassengersForm: boolean = false;
  constructor(public ticketService: TicketService) {
    this.viewPassengersForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      age: new FormControl(0, [Validators.required]),
      optedFood: new FormControl("", [Validators.required]),
      seatNumber: new FormControl("", [Validators.required]),
      travelClass: new FormControl("", [Validators.required])
    })
    this.showTicketHistory()
  }

  ngOnInit(): void {
  }

  showTicketHistory() {
    this.ticketService.getAllTickets()
      .subscribe((res: any) => {
        this.tickets = res;
        this.tickets = this.tickets
          .filter(ticket => ticket.bookedBy == sessionStorage.getItem("userid")
          )
      })
  }

  viewPassengers(ticket: Ticket) {
    this.passengers = ticket.passesngers;
    this.showViewPassengersForm = true;

  }

  cancelviewPassengersForm() {
    this.showViewPassengersForm = false;
  }

  cancelTicket(ticket: Ticket) {
    if (ticket.status == "Active") {
      let currentDate = new Date();
      let dateSplitter: string[] = ticket.dateOfJourney.split("/");
      let timeSplitter: string[] = ticket.arrivalTime.split(":");
      let constructedDate: string = dateSplitter[2] + "-" + dateSplitter[1] + "-" + dateSplitter[0] + "T" +
        timeSplitter[0] + ":" + timeSplitter[1] + ":00.000Z"
      let actualDate = new Date(constructedDate);

      var Time = actualDate.getTime() - currentDate.getTime();
      let days: number = Time / (1000 * 3600 * 24)

      if (days > 1) {
        ticket.status = "Cancelled"
        this.ticketService.updateTicket(ticket)
          .subscribe((res: any) => {
            this.showTicketHistory()
          });

      }
    }
  }

  
}
