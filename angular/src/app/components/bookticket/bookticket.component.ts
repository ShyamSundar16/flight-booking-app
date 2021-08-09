import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/Coupon';
import { Flight } from 'src/app/models/Flight';
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

  onwardFligt: Flight = new Flight;
  returnFligt: Flight = new Flight;
  roundtripAvailable: boolean = false;

  constructor(public flightService: FlightService, public couponService: CouponService,
    public searchFlightComponent: SearchFlightComponent, public userService: UserService,
    public tickerService: TicketService, public router: Router) {
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
    this.payForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      cardnumber: new FormControl(0, [Validators.required]),
      expMonth: new FormControl("", [Validators.required]),
      expYear: new FormControl("", [Validators.required]),
      cvv: new FormControl("", [Validators.required]),

    })
    this.setFlightDetails();
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
      let price: number = this.onwardFligt.businessClassPrice;
      this.totalAmount = +this.totalAmount + +price;
    }

    if (this.selectedTravelClass == "Economy") {
      let price: number = this.onwardFligt.economyClassPrice;
      this.totalAmount = +this.totalAmount + +price;
    }


    if (this.roundtripAvailable) {
      if (this.selectedTravelClass == "Business") {
        let price: number = this.returnFligt.businessClassPrice;
        this.totalAmount = +this.totalAmount + +price;
      }
      if (this.selectedTravelClass == "Economy") {
        let price: number = this.returnFligt.economyClassPrice;
        this.totalAmount = +this.totalAmount + +price;
      }

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
    let generatedPNROnward: string = "";

    generatedPNROnward = this.onwardFligt.code + this.getRandomInt(1, 5000);

    let onwardTicket = new Ticket();
    onwardTicket.flightCode = this.onwardFligt.code;
    onwardTicket.from = this.onwardFligt.from;
    onwardTicket.to = this.onwardFligt.to;
    onwardTicket.arrivalTime = this.onwardFligt.arrivalTime;
    onwardTicket.depatureTime = this.onwardFligt.depatureTime;
    onwardTicket.dateOfJourney = this.onwardFligt.dateOfDepature;
    onwardTicket.bookedBy = this.userService.user.email;
    onwardTicket.status = "Active";
    onwardTicket.amountPaid = this.getTotalAmount();
    onwardTicket.numberOfPassesngers = this.passengersCount;
    onwardTicket.passesngers = this.passesngers;
    onwardTicket.pnr = generatedPNROnward;
    onwardTicket.id = generatedPNROnward;
    this.tickerService.saveTickets(onwardTicket).subscribe((res) => {
    });

    if (this.roundtripAvailable) {
      generatedPNROnward = this.returnFligt.code + this.getRandomInt(1, 5000);

      onwardTicket.flightCode = this.returnFligt.code;
      onwardTicket.from = this.returnFligt.from;
      onwardTicket.to = this.returnFligt.to;
      onwardTicket.arrivalTime = this.returnFligt.arrivalTime;
      onwardTicket.depatureTime = this.returnFligt.depatureTime;
      onwardTicket.dateOfJourney = this.returnFligt.dateOfDepature;
      onwardTicket.bookedBy = this.userService.user.email;
      onwardTicket.status = "Active";
      onwardTicket.amountPaid = this.getTotalAmount();
      onwardTicket.numberOfPassesngers = this.passengersCount;
      onwardTicket.passesngers = this.passesngers;
      onwardTicket.pnr = generatedPNROnward;
      onwardTicket.id = generatedPNROnward;
      this.tickerService.saveTickets(onwardTicket).subscribe((res) => {
      });
    }
    this.router.navigate(["ticketHistory"]);
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setFlightDetails() {
    this.onwardFligt = JSON.parse(sessionStorage.OnwardFlight);
    if (sessionStorage.roundTrip) {
      this.roundtripAvailable = sessionStorage.roundTrip;
      this.returnFligt = JSON.parse(sessionStorage.ReturnFlight);
    }
  }
}
