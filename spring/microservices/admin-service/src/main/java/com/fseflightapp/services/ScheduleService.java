package com.fseflightapp.services;

import com.fseflightapp.entities.Schedule;
import com.fseflightapp.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Schedule getScheduleById(String id) {
        Optional<Schedule> flightOptional = scheduleRepository.findById(id);
        if (flightOptional.isPresent()) {
            return flightOptional.get();
        } else {
            System.out.println("Schedule not found with id: " + id);
            return null;
        }
    }

    public String save(Schedule flight) {
        scheduleRepository.save(flight);
        return "SuccessFully added";
    }

    public Schedule modifySchedule(String id, Schedule flight) {
        if (scheduleRepository.existsById(id)) {
            flight.setId(id);
            return scheduleRepository.save(flight);
        } else {
            System.out.println("Schedule not found with id: " + id);
            return null;
        }
    }

    public boolean removeSchedule(String id) {
        scheduleRepository.deleteById(id);
        return true;
    }
}
