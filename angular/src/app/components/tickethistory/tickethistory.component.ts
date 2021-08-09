import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tickethistory',
  templateUrl: './tickethistory.component.html',
  styleUrls: ['./tickethistory.component.scss']
})
export class TickethistoryComponent implements OnInit {

  tickets: Ticket[] = []
  constructor(public ticketService: TicketService,public userService:UserService) { 
    this.showTicketHistory()
  }

  ngOnInit(): void {
  }

  showTicketHistory(){
    this.ticketService.getAllTickets()
    .subscribe((res:any) => {
      console.log(res)
      this.tickets=res;
     this.tickets= this.tickets.filter( ticket => ticket.bookedBy==this.userService.user.email)
     this.tickets.forEach(ticket => {
       console.log(ticket.dateOfJourney.getUTCDate)
       console.log(ticket.dateOfJourney.getTime)
    })
    })
  }

}
