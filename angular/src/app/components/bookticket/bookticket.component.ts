import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/Coupon';
import { Passenger } from 'src/app/models/Passenger';
import { Ticket } from 'src/app/models/Ticket';
import { CouponService } from 'src/app/services/coupon.service';
import { FlightService } from 'src/app/services/flight.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { SearchFlightComponent } from '../search-flight/search-flight.component';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.scss']
})
export class BookticketComponent implements OnInit {
  passesngers: Passenger[] = [];
  coupons: Coupon[] = [];
  pnrList: string[] = [];
  addPassengerForm: FormGroup;
  couponForm: FormGroup;
  payForm: FormGroup;
  showAddPassengerForm: boolean = false;
  showUpdatePassengerForm: boolean = false;
  passengersCount: number = 0;
  selectedTravelClass: string = ""
  selectedFoodType: string = ""
  optedCoupon: string = ""
  totalAmount: number = 0;
  showPay: boolean = false;
  disableApplyCoupon: boolean = false;

  constructor(public flightService: FlightService, public couponService: CouponService,
     public searchFlightComponent: SearchFlightComponent, public userService: UserService,
     public tickerService:TicketService,public router:Router) {
    this.addPassengerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      seatNumber: new FormControl("", [Validators.required]),
      optedFood: new FormControl("", [Validators.required]),
      travelClass: new FormControl("", [Validators.required]),
      age: new FormControl(0, [Validators.required])

    }),
      this.couponForm = new FormGroup({
        couponCode: new FormControl("", Validators.required)
      })
      this.payForm= new FormGroup({
        name: new FormControl("", [Validators.required]),
        cardnumber: new FormControl(0, [Validators.required]),
        expMonth: new FormControl("", [Validators.required]),
        expYear: new FormControl("", [Validators.required]),
        cvv: new FormControl("", [Validators.required]),

      })
  }

  ngOnInit(): void {
  }

  travelClassType = [
    "Business",
    "Economy"
  ]
  optedFoodType = [
    "Veg",
    "Non-Veg"
  ]
  selected = "----"

  updateTravelClass(e: any) {
    this.selectedTravelClass = e.target.value
  }

  updateOptedFood(e: any) {
    this.selectedFoodType = e.target.value
  }

  updateOptedCoupon(e: any) {
    this.optedCoupon = e.target.value
  }
  showAddForm() {
    this.showAddPassengerForm = true;
  }
  showUpdateForm(passenger: Passenger) {
    this.showUpdatePassengerForm = true;
  }

  cancelAddForm() {
    this.showAddPassengerForm = false;
  }

  cancelUpdateForm() {
    this.showUpdatePassengerForm = false;
  }

  showPayButton() {
    return this.showPay;
  }
  addPassengers() {
    this.passengersCount++;
    this.passesngers.push(this.addPassengerForm.value);

    this.addPassengerForm.reset();
    this.showAddPassengerForm = false;

    if (this.selectedTravelClass == "Business") {
      let price: number = this.flightService.flight.businessClassPrice;
      this.totalAmount = +this.totalAmount + +price;
    }
    if (this.selectedTravelClass == "Economy") {
      let price: number = this.flightService.flight.economyClassPrice;
      this.totalAmount = +this.totalAmount + +price;
    }
    this.showPay = true;
    this.getAvailableCoupons();
  }

  getAvailableCoupons() {
    this.couponService.getAllCoupons()
      .subscribe((res: any) => {
        this.coupons = res;
      })
  }

  applyCoupon() {
    let filteredCoupon: Coupon[] = this.coupons.filter(coupon => coupon.code == this.optedCoupon);
    filteredCoupon.forEach(coupon => {
      this.totalAmount = this.totalAmount - coupon.couponValue;
    })

    this.disableApplyCoupon = true;
  }

  payAndBookTicket() {

    console.log("Entered book Ticket")
    let flag: boolean = true;
    let generatedPNR: string = "";
    // while (flag) {
    //   generatedPNR = this.flightService.flight.code + this.getRandomInt(1, 5000);
    //   if (!this.pnrList.includes(generatedPNR)) {
    //     this.pnrList.push(generatedPNR)
    //   }
    // }
    generatedPNR = this.flightService.flight.code + this.getRandomInt(1, 5000);
    console.log("Creating Ticket")

    let ticket = new Ticket();
    ticket.flightCode = this.flightService.flight.code;
    ticket.from = this.flightService.flight.from;
    ticket.to = this.flightService.flight.to;
    ticket.dateOfJourney = this.searchFlightComponent.dateOfJourney;
    ticket.bookedBy = this.userService.user.email;
    ticket.status = "Active";
    ticket.amountPaid=this.totalAmount;
    ticket.numberOfPassesngers = this.passengersCount;
    ticket.passesngers = this.passesngers;
    ticket.pnr = generatedPNR;
    ticket.id = generatedPNR;

    console.log("Ticket: "+ticket)

    this.tickerService.saveTickets(ticket).subscribe((res) =>{

    });
    console.log("Saved: ")

    this.router.navigate(["ticketHistory"]);
  }


  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
