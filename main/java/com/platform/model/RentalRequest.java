package com.platform.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "rental_requests")
public class RentalRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    // --- Σχέση με Renter (User) ---
    @ManyToOne
    @JoinColumn(name = "renter_id", nullable = false)
    @JsonIgnoreProperties({"rentals", "cars", "writtenReviews", "receivedReviews"})
    private User renter;

    // --- Σχέση με Car ---
    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    @JsonIgnoreProperties({"rentals", "owner"})
    private Car car;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public User getRenter() { return renter; }
    public void setRenter(User renter) { this.renter = renter; }

    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }
}
