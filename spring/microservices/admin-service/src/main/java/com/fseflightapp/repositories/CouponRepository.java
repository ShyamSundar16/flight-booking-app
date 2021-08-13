package com.fseflightapp.repositories;

import com.fseflightapp.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon,Integer> {
}
