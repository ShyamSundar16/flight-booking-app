package com.fseflightapp.controllers;

import com.fseflightapp.entities.Coupon;
import com.fseflightapp.exception.CouponNotFoundException;
import com.fseflightapp.repositories.CouponRepository;
import com.fseflightapp.services.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @CrossOrigin
    @GetMapping("")
    public List<Coupon> getAllCoupons() {
        return couponService.getAllCoupons();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Coupon> getCouponById(@PathVariable int id) throws CouponNotFoundException {
        return couponService.getCouponById(id);
    }

    @CrossOrigin
    @PostMapping("")
    public Coupon saveCoupon(@RequestBody Coupon coupon) {
        return couponService.save(coupon);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public Coupon modifyCoupon(@PathVariable int id, @RequestBody Coupon coupon) {
        System.out.println("Coupon to find: " + id);
        System.out.println("Coupon to update: " + coupon);
        return couponService.modifyCoupon(id, coupon);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public boolean removeCoupon(@PathVariable int id) {
        System.out.println("Book to delete: " + id);
        return couponService.removeCoupon(id);
    }
}
