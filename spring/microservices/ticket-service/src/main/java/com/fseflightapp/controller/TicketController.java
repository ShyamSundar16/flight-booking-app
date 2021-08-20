package com.fseflightapp.controller;

import com.fseflightapp.entities.Ticket;
import com.fseflightapp.exception.TicketNotFoundException;
import com.fseflightapp.repository.TicketRepository;
import com.fseflightapp.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
//@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/ticket")
public class TicketController {
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    TicketService ticketService;

    private static final String TOPIC = "ticket";

    @CrossOrigin
    @GetMapping("")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable String  id) throws TicketNotFoundException {
        return ticketService.getTicketById(id);
    }

    @CrossOrigin
    @PostMapping("")
    public Ticket saveTicket(@RequestBody Ticket ticket) {
        return ticketService.save(ticket);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public Ticket modifyTicket(@PathVariable String id, @RequestBody Ticket ticket) {
        System.out.println("Ticket to find: " + id);
        System.out.println("Ticket to update: " + ticket);
        return ticketService.modifyTicket(id, ticket);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public boolean removeTicket(@PathVariable String id) {
        System.out.println("Book to delete: " + id);
        return ticketService.removeTicket(id);
    }

    @KafkaListener(topics = TOPIC, groupId="group_id", containerFactory = "userKafkaListenerFactory")
    public void consumeJson(Ticket ticket) {
        System.out.println("Consumed Message: " + ticket);
        ticketService.save(ticket);
    }
}
