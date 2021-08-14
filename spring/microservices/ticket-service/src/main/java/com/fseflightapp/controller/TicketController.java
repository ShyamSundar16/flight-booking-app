package com.fseflightapp.controller;

import com.fseflightapp.entities.Ticket;
import com.fseflightapp.repository.TicketRepository;
import com.fseflightapp.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/ticket")
public class TicketController {
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    TicketService ticketService;

    @CrossOrigin
    @GetMapping("")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable String  id) {
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
}
