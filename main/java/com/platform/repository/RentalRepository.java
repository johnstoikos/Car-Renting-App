package com.platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.platform.model.RentalRequest;

@Repository
public interface RentalRepository extends JpaRepository<RentalRequest, Long> {
}
