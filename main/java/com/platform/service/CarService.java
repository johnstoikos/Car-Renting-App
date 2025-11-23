package com.platform.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.platform.model.Car;
import com.platform.repository.CarRepository;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Optional<Car> findById(Long id) {
        return carRepository.findById(id);
    }

    public Car updateCar(Long id, Car updatedCar) {
        return carRepository.findById(id).map(car -> {
            car.setModel(updatedCar.getModel());
            car.setCarYear(updatedCar.getCarYear());
            car.setCc(updatedCar.getCc());
            car.setPricePerDay(updatedCar.getPricePerDay());
            car.setAddress(updatedCar.getAddress());
            car.setLatitude(updatedCar.getLatitude());
            car.setLongitude(updatedCar.getLongitude());
            car.setAvailableFrom(updatedCar.getAvailableFrom());
            car.setAvailableUntil(updatedCar.getAvailableUntil());
            return carRepository.save(car);
        }).orElseThrow(() -> new RuntimeException("Car not found with id: " + id));
    }

    public void deleteCar(Long id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
        } else {
            throw new RuntimeException("Car not found with id: " + id);
        }
    }
}
