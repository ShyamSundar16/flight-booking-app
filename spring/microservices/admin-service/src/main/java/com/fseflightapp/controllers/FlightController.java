package com.fseflightapp.controllers;

import com.fseflightapp.entities.Flight;
import com.fseflightapp.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/flights")

public class FlightController {

    @Autowired
    FlightService service;

    @CrossOrigin
    @GetMapping("")
    public List<Flight> getAllFlights(){
        return service.getAllFlights();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Flight getFlightById(@PathVariable int id){
        return service.getFlightById(id);
    }
    @CrossOrigin
    @PostMapping("")
    public Flight saveFlight(@RequestBody Flight flight) {
        return service.save(flight);
    }
    @CrossOrigin
    @PutMapping("/{id}")
    public Flight modifyFlight(@PathVariable int id, @RequestBody Flight flight) {
        System.out.println("Flight to find: "+id);
        System.out.println("Flight to update: "+flight);
        return service.modifyFlight(id, flight);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public boolean removeFlight(@PathVariable int id) {
        System.out.println("Book to delete: "+id);
        return service.removeFlight(id);
    }
}
