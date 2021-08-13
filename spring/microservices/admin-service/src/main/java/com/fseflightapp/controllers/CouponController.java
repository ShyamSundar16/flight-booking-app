package com.fseflightapp.controllers;

import com.fseflightapp.entities.Coupon;
import com.fseflightapp.repositories.CouponRepository;
import com.fseflightapp.services.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coupons")
public class CouponController {
    @Autowired
    CouponRepository couponRepository;
    
    @Autowired
    CouponService couponService;

    @GetMapping("")
    @Cacheable(value = "coupons")
    public List<Coupon> getAllCoupons(){
        System.out.println("Finding coupons from db..");
        return couponService.getAllCoupons();
    }

    @PostMapping("/add")
    public String addCoupon(@RequestBody Coupon coupon) throws Exception {
        couponService.save(coupon);
        return "redirect:../";
    }


    @GetMapping("/{id}")
    @Cacheable(key="#id", value = "coupons")
    public Coupon getCouponById(@PathVariable int id){
        System.out.println("Find coupon with Id : "+id);
        return couponService.getCouponById(id);
    }

    @PutMapping("/{id}")
    @CacheEvict(key="#id", value = "coupons")
    public Coupon modifyCoupon(@PathVariable int id, @RequestBody Coupon coupon) {
        return couponService.modifyCoupon(id, coupon);
    }

    @DeleteMapping("/{id}")
    @CacheEvict(key="#id", value = "coupons")
    public boolean removeCoupon(@PathVariable int id) {
        System.out.println("Coupon to delete: "+id);
        return couponService.removeCoupon(id);
    }
}
