import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/Coupon';
import { Flight } from 'src/app/models/Flight';
import { Passenger } from 'src/app/models/Passenger';
import { Schedule } from 'src/app/models/Schedule';
import { Ticket } from 'src/app/models/Ticket';
import { CouponService } from 'src/app/services/coupon.service';
import { FlightService } from 'src/app/services/flight.service';
import { ScheduleService } from 'src/app/services/schedule.service';
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

  onwardBusinessPassengerCount: number = 0;
  returnBusinessPassengerCount: number = 0;

  onwardEconmoyPassengerCount: number = 0;
  returEconmoyPassengerCount: number = 0;

  // scheduleList: Schedule[] = [];

  constructor(public flightService: FlightService, public couponService: CouponService,
    public searchFlightComponent: SearchFlightComponent, public userService: UserService,
    public tickerService: TicketService, public router: Router, public scheduleService: ScheduleService) {
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
    if (this.checkIfTicketsAvailable()) {
      this.passengersCount++;
      this.passesngers.push(this.addPassengerForm.value);
      this.addPassengerForm.reset();
      this.showAddPassengerForm = false;

      if (this.selectedTravelClass == "Business") {
        this.onwardBusinessPassengerCount++;
        let price: number = this.onwardFligt.businessClassPrice;
        this.totalAmount = +this.totalAmount + +price;
      }

      if (this.selectedTravelClass == "Economy") {
        this.onwardEconmoyPassengerCount++;
        let price: number = this.onwardFligt.economyClassPrice;
        this.totalAmount = +this.totalAmount + +price;
      }


      if (this.roundtripAvailable) {
        if (this.selectedTravelClass == "Business") {
          this.returnBusinessPassengerCount++;
          let price: number = this.returnFligt.businessClassPrice;
          this.totalAmount = +this.totalAmount + +price;
        }
        if (this.selectedTravelClass == "Economy") {
          this.returEconmoyPassengerCount++;
          let price: number = this.returnFligt.economyClassPrice;
          this.totalAmount = +this.totalAmount + +price;
        }

      }
      this.showPay = true;
      this.getAvailableCoupons();
    }
    else {
      alert("Ticket not available");
    }
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


    let keyConstructonward: string[] = this.onwardFligt.dateOfDepature.split("/");
    let onwardScheduleid = this.onwardFligt.code + "_" + keyConstructonward[0] + "_" + keyConstructonward[1] + "_" + keyConstructonward[2] + "_" + this.onwardFligt.arrivalTime;

    let keyConstructreturn = this.returnFligt.dateOfDepature.split("/");
    let returnScheduleid = this.returnFligt.code + "_" + keyConstructreturn[0] + "_" + keyConstructreturn[1] + "_" + keyConstructreturn[2] + "_" + this.returnFligt.arrivalTime;

    let generatedPNROnward: string = "";

    generatedPNROnward = this.onwardFligt.code + this.getRandomInt(1, 5000);

    let onwardTicket = new Ticket();
    onwardTicket.flightCode = this.onwardFligt.code;
    onwardTicket.source = this.onwardFligt.source;
    onwardTicket.destination = this.onwardFligt.destination;
    onwardTicket.arrivalTime = this.onwardFligt.arrivalTime;
    onwardTicket.departureTime = this.onwardFligt.departureTime;
    onwardTicket.dateOfJourney = this.onwardFligt.dateOfDepature;
    onwardTicket.bookedBy = this.userService.user.email;
    onwardTicket.status = "Active";
    onwardTicket.amountPaid = this.getTotalAmount();
    onwardTicket.numberOfPassesngers = this.passengersCount;
    onwardTicket.passesngers = JSON.stringify(this.passesngers);
    onwardTicket.pnr = generatedPNROnward;
    onwardTicket.id = generatedPNROnward;
    this.tickerService.saveTickets(onwardTicket).subscribe((res) => {
    });


    if (this.roundtripAvailable) {
      generatedPNROnward = this.returnFligt.code + this.getRandomInt(1, 5000);

      onwardTicket.flightCode = this.returnFligt.code;
      onwardTicket.source = this.returnFligt.source;
      onwardTicket.destination = this.returnFligt.destination;
      onwardTicket.arrivalTime = this.returnFligt.arrivalTime;
      onwardTicket.departureTime = this.returnFligt.departureTime;
      onwardTicket.dateOfJourney = this.returnFligt.dateOfDepature;
      onwardTicket.bookedBy = this.userService.user.email;
      onwardTicket.status = "Active";
      onwardTicket.amountPaid = this.getTotalAmount();
      onwardTicket.numberOfPassesngers = this.passengersCount;
      onwardTicket.passesngers = JSON.stringify(this.passesngers);
      onwardTicket.pnr = generatedPNROnward;
      onwardTicket.id = generatedPNROnward;
      this.tickerService.saveTickets(onwardTicket).subscribe((res) => {
      });


      this.scheduleService.getScheduleInfo()
        .subscribe((res: any) => {
          let scheduleList: Schedule[] = res;
          scheduleList.forEach(schedule => {

            let onwardSchedule: Schedule = new Schedule
            let returnSchedule: Schedule = new Schedule
            if (schedule.id == onwardScheduleid) {
              onwardSchedule = schedule
              if (onwardSchedule != null) {
                onwardSchedule.availableBusinessTickets = onwardSchedule.availableBusinessTickets - this.onwardBusinessPassengerCount;
                onwardSchedule.availableEconomyTickets = onwardSchedule.availableEconomyTickets - this.onwardEconmoyPassengerCount;
                this.scheduleService.updateSchedule(onwardSchedule).subscribe((res: any) => {
                })
              }
            }
            if (schedule.id == returnScheduleid) {
              returnSchedule = schedule
              if (this.roundtripAvailable) {
                if (returnSchedule != null) {
                  
                  returnSchedule.availableBusinessTickets = returnSchedule.availableBusinessTickets - this.returnBusinessPassengerCount;
                  returnSchedule.availableEconomyTickets = returnSchedule.availableEconomyTickets - this.returEconmoyPassengerCount;
                  this.scheduleService.updateSchedule(returnSchedule).subscribe((res: any) => {

                  })
                }
              }
            }
          })
        })

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

  checkIfTicketsAvailable(): boolean {
    if (this.selectedTravelClass == "Business") {

      if (this.onwardBusinessPassengerCount >= this.onwardFligt.availableBusinessTickets) {
        return false;
      }
    }

    if (this.selectedTravelClass == "Economy") {
      if (this.onwardEconmoyPassengerCount >= this.onwardFligt.availableEconomyTickets) {
        return false;
      }
    }

    if (this.roundtripAvailable) {
      if (this.selectedTravelClass == "Business") {
        if (this.returnBusinessPassengerCount >= this.returnFligt.availableBusinessTickets) {
          return false;
        }
      }
      if (this.selectedTravelClass == "Economy") {
        if (this.returEconmoyPassengerCount >= this.returnFligt.availableEconomyTickets) {
          return false;
        }
      }

    }
    return true;
  }
}
