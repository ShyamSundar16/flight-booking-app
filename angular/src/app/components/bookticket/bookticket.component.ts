import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Coupon } from 'src/app/models/Coupon';
import { Passenger } from 'src/app/models/Passenger';
import { CouponService } from 'src/app/services/coupon.service';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.scss']
})
export class BookticketComponent implements OnInit {
  passesngers: Passenger[] = [];
  coupons: Coupon[] = [];
  addPassengerForm: FormGroup;
  couponForm: FormGroup;
  showAddPassengerForm: boolean = false;
  showUpdatePassengerForm: boolean = false;
  passengersCount: number = 0;
  selectedTravelClass: string = ""
  selectedFoodType: string = ""
  optedCoupon: string = ""
  totalAmount: number = 0;
  showPay: boolean = false;
  disableApplyCoupon: boolean = false;

  constructor(public flightService: FlightService, public couponService: CouponService) {
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
    let filteredCoupon: Coupon[] = this.coupons.filter(coupon => coupon.code ==this.optedCoupon);
    filteredCoupon.forEach(coupon => {
      this.totalAmount = this.totalAmount - coupon.couponValue;
    })

    this.disableApplyCoupon = true;
  }
}
