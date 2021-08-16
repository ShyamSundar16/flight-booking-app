package com.fseflightapp.searchflightservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fseflightapp.searchflightservice.model.Ticket;
import org.apache.kafka.common.serialization.Serializer;

import java.util.Map;

public class TicketSerializer implements Serializer<Ticket> {

    @Override public void configure(Map<String, ?> map, boolean b) {

    }

    @Override public byte[] serialize(String arg0, Ticket arg1) {
        byte[] retVal = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            retVal = objectMapper.writeValueAsString(arg1).getBytes();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return retVal;
    }

    @Override public void close() {

    }

}
