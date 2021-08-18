package com.fseflightapp.services;

import com.fseflightapp.entities.Flight;
import com.fseflightapp.exception.FlightNotFoundException;
import com.fseflightapp.repositories.FlightRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class FlightServiceTest {
    static List<Flight> flightList = new ArrayList<Flight>();
    @Autowired
    FlightService flightService;
    @MockBean
    @Autowired
    FlightRepository flightRepository;

    @Test
    @Order(1)
    @DisplayName("Add Flights")
    public void addFlightsTest() {
        Flight flight1 = new Flight(1, "INDGO101", "Indigo", true, true, "5600", "3200", "Monday,Wednesday,Saturday", "Chennai", "Mumbai", "support@indigo.com", "Active", "AE320");
        Flight flight2 = new Flight(2, "AIRINDO101", "AirIndia", true, true, "7200", "4300", "Monday,Wednesday,Saturday", "Chennai", "Mumbai", "support@airindia.com", "Active", "DS320");
        Flight flight3 = new Flight(3, "AIRINDO101", "AirIndia", true, true, "7200", "4300", "Monday,Wednesday,Saturday", "Mumbai", "Chennai", "support@airindia.com", "Active", "DS320");
        flightService.save(flight1);
        flightService.save(flight2);
        flightService.save(flight3);
        flightList.addAll(Arrays.asList(flight1, flight2, flight3));
        when(flightRepository.findAll()).thenReturn(flightList);
        for (Flight flight : flightList) {
            Assertions.assertAll(
                    () -> Assertions.assertNotNull(flight.getId()),
                    () -> Assertions.assertNotNull(flight.getCode()),
                    () -> Assertions.assertNotNull(flight.getAirlines()),
                    () -> Assertions.assertNotNull(flight.getContact()),
                    () -> Assertions.assertNotNull(flight.getSource()),
                    () -> Assertions.assertNotNull(flight.getDestination()),
                    () -> Assertions.assertNotNull(flight.getStatus()),
                    () -> Assertions.assertNotNull(flight.getRunsOn()),
                    () -> Assertions.assertNotNull(flight.getInstrument()),
                    () -> Assertions.assertNotNull(flight.getBusinessClassPrice()),
                    () -> Assertions.assertNotNull(flight.getEconomyClassPrice())
            );
            Assertions.assertEquals(3, flightService.getAllFlights().size());
        }
    }

    @Test
    @Order(2)
    @DisplayName("Get All Flights")
    void getAllFlightsTest() {
        flightService.getAllFlights();
        Assertions.assertEquals(flightList, flightService.getAllFlights());

    }

    @Test
    @Order(3)
    @DisplayName("Get Flights based on Id")
    public void whenGivenId_shouldReturnFlight_ifFound() throws FlightNotFoundException {
        Flight flight = new Flight();
        flight.setId(2);
        when(flightRepository.findById(flight.getId())).thenReturn(Optional.of(flight));
        ResponseEntity<Flight> expected = flightService.getFlightById(flight.getId());
        //assertThat(expected.getBody()).isSameAs(flight);
        Assertions.assertTrue(expected.getBody() == flight);
        verify(flightRepository).findById(flight.getId());
    }

    @Test
    @Order(4)
    @DisplayName("Throw exception if flight doesn't exist")
    public void should_throw_exception_when_flight_doesnt_exist() throws FlightNotFoundException {
        Flight flight = new Flight();
        flight.setId(8);
        flight.setAirlines("SpiceJet");
        given(flightRepository.findById(anyInt())).willReturn(Optional.ofNullable(null));
        Assertions.assertThrows(FlightNotFoundException.class, () -> flightService.getFlightById(flight.getId()));
    }
}
