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

    @GetMapping("")
    public List<Schedule> getAllSchedules() {
        System.out.println("Finding schedules from db..");
        return scheduleService.getAllSchedules();
    }

    @PostMapping("/add")
    public String addSchedule(@RequestBody Schedule schedule) throws Exception {
        scheduleService.save(schedule);
        return "redirect:../";
    }


    @GetMapping("/{id}")
    public Schedule getScheduleById(@PathVariable String id) {
        System.out.println("Find schedule with Id : " + id);
        return scheduleService.getScheduleById(id);
    }

    @PutMapping("/{id}")
    public Schedule modifySchedule(@PathVariable String id, @RequestBody Schedule schedule) {
        return scheduleService.modifySchedule(id, schedule);
    }

    @DeleteMapping("/{id}")
    public boolean removeSchedule(@PathVariable String id) {
        System.out.println("Schedule to delete: " + id);
        return scheduleService.removeSchedule(id);
    }
}
