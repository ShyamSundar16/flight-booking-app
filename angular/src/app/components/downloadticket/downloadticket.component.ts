import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/Passenger';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-downloadticket',
  templateUrl: './downloadticket.component.html',
  styleUrls: ['./downloadticket.component.scss']
})
export class DownloadticketComponent implements OnInit {
  ticket: Ticket = new Ticket;
  passengers: Passenger[] = []
  constructor(public ticketService: TicketService) {
    this.ticket = ticketService.ticket;
    this.passengers = ticketService.ticket.passesngers;
  }

  ngOnInit(): void {
  }

  public downloadTicketPDF():void {
    let DATA:any = document.getElementById('htmlData');
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save("Ticket_"+this.ticket.pnr+".pdf");
    });     
  }

}
