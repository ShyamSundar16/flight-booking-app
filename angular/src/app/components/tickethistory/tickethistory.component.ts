import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';


@Component({
  selector: 'app-tickethistory',
  templateUrl: './tickethistory.component.html',
  styleUrls: ['./tickethistory.component.scss']
})
export class TickethistoryComponent implements OnInit {

  tickets: Ticket[] = []
  constructor(public ticketService: TicketService, public router:Router) {

    this.showTicketHistory()
  }

  ngOnInit(): void {
  }

  showTicketHistory() {
    this.ticketService.getAllTickets()
      .subscribe((res: any) => {
        console.log(res)
        this.tickets = res;
        this.tickets = this.tickets
          // .filter(ticket => ticket.bookedBy == sessionStorage.userid
          // )
      })
  }

  viewTicket(ticket: Ticket) {
    this.ticketService.ticket=ticket;
    this.router.navigate(["downloadTicket"]);

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
