package com.fseflightapp.services;

import com.fseflightapp.entities.Flight;
import com.fseflightapp.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    FlightRepository flightRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight getFlightById(int id) {
        Optional<Flight> flightOptional = flightRepository.findById(id);
        if (flightOptional.isPresent()) {
            return flightOptional.get();
        } else {
            System.out.println("Flight not found with id: " + id);
            return null;
        }
    }

    public String save(Flight flight) {
        flightRepository.save(flight);
        return "SuccessFully added";
    }

    public Flight modifyFlight(int id, Flight flight) {
        if (flightRepository.existsById(id)) {
            flight.setId(id);
            return flightRepository.save(flight);
        } else {
            System.out.println("Flight not found with id: " + id);
            return null;
        }
    }

    public boolean removeFlight(int id) {
        flightRepository.deleteById(id);
        return true;
    }
}
