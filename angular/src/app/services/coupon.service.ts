import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http/";
import { Coupon } from "../models/Coupon";

@Injectable()
export class CouponService {
    private url: string = "http://ec2-3-142-134-192.us-east-2.compute.amazonaws.com:8989/api/admin/coupons";
    private c = new Coupon();


    constructor(private httpClient: HttpClient) {
    }
    public set coupon(newC: Coupon) {
        this.c.id = newC.id;
        this.c.code = newC.code;
        this.c.couponValue = newC.couponValue;
        this.c.validTill = newC.validTill;
        this.c.status = newC.status;

    }

    public get flight() {
        return this.c;
    }

    getAllCoupons() {
        return this.httpClient.get(this.url);
    }

    saveCoupon(coupon: Coupon) {
        return this.httpClient.post(this.url, coupon);
    }

    deleteCoupon(id: number) {
        return this.httpClient.delete(this.url + "/" + id);
    }

    updateCoupon(coupon: Coupon) {
        return this.httpClient.put(this.url + "/" + coupon.id, coupon);
    }
}