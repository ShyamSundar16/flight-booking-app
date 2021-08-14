package com.fseflightapp.service;

import com.fseflightapp.entities.Ticket;
import com.fseflightapp.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;

    @Cacheable("tickets")
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Cacheable("ticket")
    public Ticket getTicketById(String  id) {
        Optional<Ticket> ticketOptional = ticketRepository.findById(id);
        if (ticketOptional.isPresent()) {
            return ticketOptional.get();
        } else {
            System.out.println("Ticket not found with id: " + id);
            return null;
        }
    }

    @Caching(evict = {
            @CacheEvict(value = "ticket", allEntries = true),
            @CacheEvict(value = "tickets", allEntries = true)})
    public Ticket save(Ticket ticket) {
        return ticketRepository.save(ticket);

    }

    @Caching(evict = {
            @CacheEvict(value = "ticket", allEntries = true),
            @CacheEvict(value = "tickets", allEntries = true)})
    public Ticket modifyTicket(String id, Ticket ticket) {
        if (ticketRepository.existsById(id)) {
            ticket.setId(id);
            return ticketRepository.save(ticket);
        } else {
            System.out.println("Ticket not found with id: " + id);
            return null;
        }
    }

    @Caching(evict = {
            @CacheEvict(value = "ticket", allEntries = true),
            @CacheEvict(value = "tickets", allEntries = true)})
    public boolean removeTicket(String id) {
        ticketRepository.deleteById(id);
        return true;
    }
}
