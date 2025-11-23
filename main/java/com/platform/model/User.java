package com.platform.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("owner") 
    private List<Car> cars = new ArrayList<>();

    @OneToMany(mappedBy = "renter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("renter")  
    private List<RentalRequest> rentals = new ArrayList<>();

    @OneToMany(mappedBy = "reviewer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("reviewer") 
    private List<Review> writtenReviews = new ArrayList<>();

    @OneToMany(mappedBy = "reviewee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("reviewee") 
    private List<Review> receivedReviews = new ArrayList<>();

    public enum Role {
        OWNER,
        RENTER
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public List<Car> getCars() { return cars; }
    public void setCars(List<Car> cars) { this.cars = cars; }

    public List<RentalRequest> getRentals() { return rentals; }
    public void setRentals(List<RentalRequest> rentals) { this.rentals = rentals; }

    public List<Review> getWrittenReviews() { return writtenReviews; }
    public void setWrittenReviews(List<Review> writtenReviews) { this.writtenReviews = writtenReviews; }

    public List<Review> getReceivedReviews() { return receivedReviews; }
    public void setReceivedReviews(List<Review> receivedReviews) { this.receivedReviews = receivedReviews; }
}
