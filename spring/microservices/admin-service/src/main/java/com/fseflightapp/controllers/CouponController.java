package com.fseflightapp.controllers;

import com.fseflightapp.entities.Coupon;
import com.fseflightapp.repositories.CouponRepository;
import com.fseflightapp.services.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/coupons")
public class CouponController {
    @Autowired
    CouponRepository couponRepository;

    @Autowired
    CouponService couponService;

    @GetMapping("")
    public List<Coupon> getAllCoupons() {
        return couponService.getAllCoupons();
    }

    @PostMapping("/add")
    public String addCoupon(@RequestBody Coupon coupon) throws Exception {
        couponService.save(coupon);
        return "redirect:../";
    }


    @GetMapping("/{id}")
    public Coupon getCouponById(@PathVariable int id) {
        System.out.println("Find coupon with Id : " + id);
        return couponService.getCouponById(id);
    }

    @PutMapping("/{id}")
    public Coupon modifyCoupon(@PathVariable int id, @RequestBody Coupon coupon) {
        return couponService.modifyCoupon(id, coupon);
    }

    @DeleteMapping("/{id}")
    public boolean removeCoupon(@PathVariable int id) {
        System.out.println("Coupon to delete: " + id);
        return couponService.removeCoupon(id);
    }
}
