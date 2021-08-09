import { Passenger } from "./Passenger";

export class Ticket{
id:string="";
pnr:string=""; //ToBe generated
flightCode:string=""
bookedBy:string=""; //user mailid
numberOfPassesngers:number=0; //Increment using counter
passesngers:Passenger[]=[];
from:string="";
to:string="";
dateOfJourney:Date=new Date;
arrivalTime:string="";
depatureTime:string="";
amountPaid:number=0;
status:string="";
}