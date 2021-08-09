import { Passenger } from "./Passenger";

export class Ticket{
pnr:string=""; //ToBe generated
bookedBy:string=""; //user mailid
numberOfPassesngers:number=0; //Increment using counter
passesngers:Passenger[]=[];
from:string="";
to:string="";
dateOfJourney:Date=new Date;
arrivalTime:string="";
depatureTime:string="";
}