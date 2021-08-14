package com.fseflightapp.services;

import com.fseflightapp.entities.Schedule;
import com.fseflightapp.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;

    @Cacheable("schedules")
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @Cacheable("schedule")
    public Schedule getScheduleById(String id) {
        Optional<Schedule> flightOptional = scheduleRepository.findById(id);
        if (flightOptional.isPresent()) {
            return flightOptional.get();
        } else {
            System.out.println("Schedule not found with id: " + id);
            return null;
        }
    }

    @Caching(evict = {
            @CacheEvict(value = "schedule", allEntries = true),
            @CacheEvict(value = "schedules", allEntries = true)})
    public String save(Schedule flight) {
        scheduleRepository.save(flight);
        return "SuccessFully added";
    }

    @Caching(evict = {
            @CacheEvict(value = "schedule", allEntries = true),
            @CacheEvict(value = "schedules", allEntries = true)})
    public Schedule modifySchedule(String id, Schedule flight) {
        if (scheduleRepository.existsById(id)) {
            flight.setId(id);
            return scheduleRepository.save(flight);
        } else {
            System.out.println("Schedule not found with id: " + id);
            return null;
        }
    }

    @Caching(evict = {
            @CacheEvict(value = "schedule", allEntries = true),
            @CacheEvict(value = "schedules", allEntries = true)})
    public boolean removeSchedule(String id) {
        scheduleRepository.deleteById(id);
        return true;
    }
}
