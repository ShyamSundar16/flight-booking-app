package com.fseflightapp.services;

import com.fseflightapp.entities.Flight;
import com.fseflightapp.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    FlightRepository flightRepository;

    @Cacheable("flights")
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Cacheable("flight")
    public Flight getFlightById(int id) {
        Optional<Flight> flightOptional = flightRepository.findById(id);
        if (flightOptional.isPresent()) {
            return flightOptional.get();
        } else {
            System.out.println("Flight not found with id: " + id);
            return null;
        }
    }
    @Caching(evict = {
            @CacheEvict(value="flight", allEntries=true),
            @CacheEvict(value="flights", allEntries=true)})
    public Flight save(Flight flight) {
        return flightRepository.save(flight);
    }

    @Caching(evict = {
            @CacheEvict(value="flight", allEntries=true),
            @CacheEvict(value="flights", allEntries=true)})
    public Flight modifyFlight(int id, Flight flight) {
        if (flightRepository.existsById(id)) {
            flight.setId(id);
            return flightRepository.save(flight);
        } else {
            System.out.println("Flight not found with id: " + id);
            return null;
        }
    }

    @Caching(evict = {
            @CacheEvict(value="flight", allEntries=true),
            @CacheEvict(value="flights", allEntries=true)})
    public boolean removeFlight(int id) {
        flightRepository.deleteById(id);
        return true;
    }
}
