package com.fseflightapp.searchflightservice.config;

import java.util.HashMap;
import java.util.Map;

import com.fseflightapp.searchflightservice.model.Ticket;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;


@Configuration
public class KafkaProducerConfiguration {

    @Bean
    public ProducerFactory<String, Ticket> producerFactory() {
        Map<String, Object> config = new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "com.fseflightapp.searchflightservice.config.TicketSerializer");

        return new DefaultKafkaProducerFactory<String, Ticket>(config);
    }

    @Bean
    public KafkaTemplate<String, Ticket> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }

}
