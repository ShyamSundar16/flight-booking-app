package com.fseflightapp.searchflightservice.controller;

import com.fseflightapp.searchflightservice.model.Flight;
import com.fseflightapp.searchflightservice.model.Schedule;
import com.fseflightapp.searchflightservice.model.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/searchFlight")
public class SearchFlightController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private KafkaTemplate<String, Ticket> kafkaTemplate;

    @CrossOrigin
    @GetMapping("/filter")
    public List<Flight> getFlightsBasedOnSchedule(@RequestParam(value = "source", required = true) String source,
                                                  @RequestParam(value = "destination", required = true) String destination,
                                                  @RequestParam(value = "doj", required = true) String doj) {

        List<Flight> flightResponseEntity = restTemplate.exchange("http://ADMIN/flights", HttpMethod.GET, null, new ParameterizedTypeReference<List<Flight>>() {
        }).getBody();
        List<Schedule> scheduleResponseEntity = restTemplate.exchange("http://ADMIN/schedule", HttpMethod.GET, null, new ParameterizedTypeReference<List<Schedule>>() {
        }).getBody();

        List<Flight> filteredFlightList = new ArrayList<>();
        scheduleResponseEntity.stream().forEach(schedule -> {
            String[] scheduledDate = schedule.getScheduledDate().split("/");
            String matchDate = scheduledDate[2] + "-" + scheduledDate[1] + "-" + scheduledDate[0];
            if (doj.equals(matchDate)) {
                flightResponseEntity.stream().forEach(flight -> {
                    if (schedule.getCode().equals(flight.getCode())) {
                            if(flight.getSource().equalsIgnoreCase(source) && flight.getDestination().equalsIgnoreCase(destination)){
                                flight.setArrivalTime(schedule.getArrivalTime());
                                flight.setDepartureTime(schedule.getDepartureTime());
                                flight.setAvailableBusinessTickets(schedule.getAvailableBusinessTickets());
                                flight.setAvailableEconomyTickets(schedule.getAvailableEconomyTickets());
                                flight.setStatus(schedule.getStatus());
                                flight.setDateOfDepature(schedule.getScheduledDate());
                                filteredFlightList.add(flight);
                            }
                    }
                });
            }
        });

        return filteredFlightList;
    }

    private static final String TOPIC = "ticket";

    @CrossOrigin
    @PostMapping("/publish")
    public ResponseEntity<Ticket> publishTicket( @RequestBody Ticket ticket) {
        kafkaTemplate.send(TOPIC, ticket);
        return new ResponseEntity<Ticket>(ticket, HttpStatus.OK);
//        return "Published successfully";
    }
}
