package com.fseflightapp.repositories;

import com.fseflightapp.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule,String> {
}
