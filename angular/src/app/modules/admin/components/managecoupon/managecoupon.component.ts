import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Coupon } from 'src/app/models/Coupon';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-managecoupon',
  templateUrl: './managecoupon.component.html',
  styleUrls: ['./managecoupon.component.scss']
})
export class ManagecouponComponent implements OnInit {

  addCouponForm: FormGroup;
  updateCouponForm: FormGroup;
  showAddCouponForm: boolean = false;
  showUpdateCouponForm: boolean = false;
  coupons: Coupon[] = [];

  constructor(public couponService:CouponService) {

    this.addCouponForm = new FormGroup({
      code: new FormControl("", [Validators.required]),
      couponValue: new FormControl("", [Validators.required]),
      validTill: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
      
    })
    this.updateCouponForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      code: new FormControl("", [Validators.required]),
      couponValue: new FormControl("", [Validators.required]),
      validTill: new FormControl(new Date(), [Validators.required]),
      status: new FormControl("", [Validators.required])
    })
    this.findAllCoupons();

   }

  ngOnInit(): void {
  }

  
  showAddForm() {
    this.showAddCouponForm = true;
  }
  showUpdateForm(coupon: Coupon) {
    this.updateCouponForm.setValue(coupon)
    this.showUpdateCouponForm = true;
  }

  cancelAddForm() {
    this.showAddCouponForm = false;
  }

  cancelUpdateForm() {
    this.showUpdateCouponForm = false;
  }
  findAllCoupons() {
    this.couponService.getAllCoupons()
      .subscribe((res: any) => {
        console.log(res);
        this.coupons = res;
      })
  }

  addCoupon() {
    this.couponService.saveCoupon(this.addCouponForm.value)
      .subscribe((res: any) => {
        this.addCouponForm.reset();
        this.showAddCouponForm = false;
        this.findAllCoupons();
      });
  }

  modifyCoupon() {
    this.couponService.updateCoupon(this.updateCouponForm.value)
      .subscribe((res: any) => {
        this.showUpdateCouponForm = false;
        this.findAllCoupons()
      });
  }
  deleteCouponById(id: number) {
    this.couponService.deleteCoupon(id)
      .subscribe((res: any) => {
        this.findAllCoupons()
      });
  }


}
