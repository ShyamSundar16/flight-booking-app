package com.fseflightapp.services;

import com.fseflightapp.entities.Coupon;
import com.fseflightapp.repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CouponService {
    @Autowired
    CouponRepository couponRepository;

    @Cacheable("coupons")
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    @Cacheable("coupon")
    public Coupon getCouponById(int id) {
        Optional<Coupon> flightOptional = couponRepository.findById(id);
        if (flightOptional.isPresent()) {
            return flightOptional.get();
        } else {
            System.out.println("Coupon not found with id: " + id);
            return null;
        }
    }

    @Caching(evict = {
            @CacheEvict(value = "coupon", allEntries = true),
            @CacheEvict(value = "coupons", allEntries = true)})
    public Coupon save(Coupon coupon) {
        return couponRepository.save(coupon);

    }

    @Caching(evict = {
            @CacheEvict(value = "coupon", allEntries = true),
            @CacheEvict(value = "coupons", allEntries = true)})
    public Coupon modifyCoupon(int id, Coupon coupon) {
        if (couponRepository.existsById(id)) {
            coupon.setId(id);
            return couponRepository.save(coupon);
        } else {
            System.out.println("Coupon not found with id: " + id);
            return null;
        }
    }

    @Caching(evict = {
            @CacheEvict(value = "coupon", allEntries = true),
            @CacheEvict(value = "coupons", allEntries = true)})
    public boolean removeCoupon(int id) {
        couponRepository.deleteById(id);
        return true;
    }
}
