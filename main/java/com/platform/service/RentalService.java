package com.platform.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.platform.model.Car;
import com.platform.model.RentalRequest;
import com.platform.model.User;
import com.platform.repository.CarRepository;
import com.platform.repository.RentalRepository;
import com.platform.repository.UserRepository;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public RentalService(RentalRepository rentalRepository,
                            CarRepository carRepository,
                            UserRepository userRepository) {
        this.rentalRepository = rentalRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    public List<RentalRequest> findAll() {
        return rentalRepository.findAll();
    }

    public Optional<RentalRequest> findById(Long id) {
        return rentalRepository.findById(id);
    }

    public RentalRequest createRental(Long renterId, Long carId, LocalDate start, LocalDate end) {
        User renter = userRepository.findById(renterId)
                .orElseThrow(() -> new RuntimeException("Renter not found with id: " + renterId));

        if (renter.getRole() != User.Role.RENTER) {
            throw new RuntimeException("User with id " + renterId + " is not a renter");
        }

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + carId));

        RentalRequest rental = new RentalRequest();
        rental.setRenter(renter);
        rental.setCar(car);
        rental.setStartDate(start);
        rental.setEndDate(end);
        rental.setStatus(RentalRequest.Status.PENDING);

        return rentalRepository.save(rental);
    }

    public RentalRequest updateStatus(Long id, RentalRequest.Status status) {
        RentalRequest rental = rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found with id: " + id));
        rental.setStatus(status);
        return rentalRepository.save(rental);
    }

    public void deleteRental(Long id) {
        if (rentalRepository.existsById(id)) {
            rentalRepository.deleteById(id);
        } else {
            throw new RuntimeException("Rental not found with id: " + id);
        }
    }
}
