package com.fseflightapp.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fseflightapp.entities.Ticket;
import org.apache.kafka.common.serialization.Deserializer;

import java.util.Map;

public class TicketDeserializer implements Deserializer<Ticket> {
    @Override public void close() {

    }

    @Override public void configure(Map<String, ?> arg0, boolean arg1) {

    }

    @Override
    public Ticket deserialize(String arg0, byte[] arg1) {
        ObjectMapper mapper = new ObjectMapper();
        Ticket ticket = null;
        try {
            ticket = mapper.readValue(arg1, Ticket.class);
        } catch (Exception e) {

            e.printStackTrace();
        }
        return ticket;
    }
}
