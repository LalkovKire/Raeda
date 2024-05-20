package org.example;

import org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

public class ConferenceTest {

    // TODO: Add tests here!

    private Conference conference;

    @BeforeEach
    public void setUp() {
        conference = new Conference(2);
    }

    @Test
    public void testAddAttendeeToConference() {
        Student student1 = new Student("John", "Doe", Course.OS, 20);
        Student student2 = new Student("Jane", "Doe", Course.EMT, 22);

        assertTrue(conference.addAttendeeToConference(student1));
        assertTrue(conference.addAttendeeToConference(student2));
        assertEquals(2, conference.getAttendees().size());

        Student student3 = new Student("Jim", "Beam", Course.WEB, 23);
        assertTrue(conference.addAttendeeToConference(student3)); // Should trigger triple capacity
        assertEquals(3, conference.getAttendees().size());
    }

    @Test
    public void testTripleCapacity() {
        assertTrue(conference.tripleCapacity());
        assertEquals(6, conference.getCapacity());

        conference = new Conference(4000);
        assertFalse(conference.tripleCapacity()); // Should not triple as it exceeds 10000
        assertEquals(4000, conference.getCapacity());
    }

    @Test
    public void testCalculateTotalPricePaid() {
        Student student1 = new Student("John", "Doe", Course.OS, 20);
        Student student2 = new Student("Jane", "Doe", Course.EMT, 22);
        Student student3 = new Student("Jim", "Beam", Course.WEB, 23);

        conference.addAttendeeToConference(student1);
        conference.addAttendeeToConference(student2);
        conference.addAttendeeToConference(student3);

        double expectedPrice = (1.0 - Conference.EMT_DISCOUNT) * Conference.TICKET_PRICE
                + (1.0 - Conference.WEB_DISCOUNT) * Conference.TICKET_PRICE
                + Conference.TICKET_PRICE;
        assertEquals(expectedPrice, conference.calculateTotalPricePaid(), 0.001);
    }

    @Test
    public void testGetAttendees() {
        Student student1 = new Student("John", "Doe", Course.OS, 20);
        conference.addAttendeeToConference(student1);

        List<Student> attendees = conference.getAttendees();
        assertEquals(1, attendees.size());
        assertEquals(student1, attendees.get(0));
    }

    @Test
    public void testGetCapacity() {
        assertEquals(2, conference.getCapacity());
    }
}