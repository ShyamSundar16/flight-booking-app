import { Passenger } from "./Passenger";

export class Ticket{
id:string="";
pnr:string=""; //ToBe generated
flightCode:string=""
bookedBy:string=""; //user mailid
numberOfPassesngers:number=0; //Increment using counter
passesngers:string="";
source:string="";
destination:string="";
dateOfJourney:string="";
arrivalTime:string="";
departureTime:string="";
amountPaid:number=0;
status:string="";
}