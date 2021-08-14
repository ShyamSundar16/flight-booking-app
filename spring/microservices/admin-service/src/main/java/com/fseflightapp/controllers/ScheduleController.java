package com.fseflightapp.controllers;

import com.fseflightapp.entities.Schedule;
import com.fseflightapp.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = {"http://localhost:4200"})

public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;

    @CrossOrigin
    @GetMapping("")
    public List<Schedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Schedule getScheduleById(@PathVariable String id) {
        return scheduleService.getScheduleById(id);
    }

    @CrossOrigin
    @PostMapping("")
    public Schedule saveSchedule(@RequestBody Schedule schedule) {
        return scheduleService.save(schedule);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public Schedule modifySchedule(@PathVariable String id, @RequestBody Schedule schedule) {
        System.out.println("Schedule to find: " + id);
        System.out.println("Schedule to update: " + schedule);
        return scheduleService.modifySchedule(id, schedule);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public boolean removeSchedule(@PathVariable String id) {
        System.out.println("Schedule to delete: " + id);
        return scheduleService.removeSchedule(id);
    }
}
