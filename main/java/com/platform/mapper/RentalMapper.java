package com.platform.mapper;

import com.platform.dto.RentalDTO;
import com.platform.model.RentalRequest;

public class RentalMapper {

    public static RentalDTO toDTO(RentalRequest rental) {
        RentalDTO dto = new RentalDTO();
        dto.setId(rental.getId());
        dto.setRenterId(rental.getRenter() != null ? rental.getRenter().getId() : null);
        dto.setCarId(rental.getCar() != null ? rental.getCar().getId() : null);
        dto.setStartDate(rental.getStartDate());
        dto.setEndDate(rental.getEndDate());
        dto.setStatus(rental.getStatus() != null ? rental.getStatus().name() : null);
        return dto;
    }
}
