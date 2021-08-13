package com.fseflightapp.controllers;

import com.fseflightapp.entities.Flight;
import com.fseflightapp.repositories.FlightRepository;
import com.fseflightapp.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flights")
@CrossOrigin(origins = {"http://localhost:4200"})

public class FlightController {
    @Autowired
    private FlightRepository flightRepo;

    @Autowired
    private FlightService flightService;

    @GetMapping("")
    @Cacheable(value = "flights")
    public List<Flight> getAllFlights(){
        System.out.println("Finding flights from db..");
        return flightService.getAllFlights();
    }

    @PostMapping("/add")
    @Cacheable(value = "flights")
    public String addFlight(@RequestBody Flight flight) throws Exception {
        flightService.save(flight);
        return "redirect:../";
    }


    @GetMapping("/{id}")
    @Cacheable(key="#id", value = "flights")
    public Flight getFlightById(@PathVariable int id){
        System.out.println("Find flight with Id : "+id);
        return flightService.getFlightById(id);
    }

    @PutMapping("/{id}")
    @CacheEvict(key="#id", value = "flights")
    public Flight modifyFlight(@PathVariable int id, @RequestBody Flight flight) {
        return flightService.modifyFlight(id, flight);
    }

    @DeleteMapping("/{id}")
    @CacheEvict(key="#id", value = "flights")
    public boolean removeFlight(@PathVariable int id) {
        System.out.println("Flight to delete: "+id);
        return flightService.removeFlight(id);
    }
}
