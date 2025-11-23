package com.platform.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.platform.dto.RentalDTO;
import com.platform.mapper.RentalMapper;
import com.platform.model.RentalRequest;
import com.platform.service.RentalService;

@RestController
@RequestMapping("/rentals")
public class RentalController {

    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @GetMapping
    public ResponseEntity<List<RentalDTO>> getAllRentals() {
    List<RentalDTO> rentals = rentalService.findAll()
            .stream()
            .map(RentalMapper::toDTO)
            .toList();
    return ResponseEntity.ok(rentals);
}

    @GetMapping("/{id}")
    public ResponseEntity<RentalDTO> getRentalById(@PathVariable Long id) {
        return rentalService.findById(id)
                .map(RentalMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<RentalDTO> createRental(@RequestParam Long renterId,
                                                    @RequestParam Long carId,
                                                    @RequestParam LocalDate start,
                                                    @RequestParam LocalDate end) {
        return ResponseEntity.ok(
                RentalMapper.toDTO(rentalService.createRental(renterId, carId, start, end))
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RentalDTO> updateRentalStatus(@PathVariable Long id,
                                                        @RequestParam RentalRequest.Status status) {
        return ResponseEntity.ok(
                RentalMapper.toDTO(rentalService.updateStatus(id, status))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable Long id) {
        rentalService.deleteRental(id);
        return ResponseEntity.noContent().build();
    }
}
