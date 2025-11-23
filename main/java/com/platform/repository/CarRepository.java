package com.platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.platform.model.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
}
