package com.platform.dto;

import java.time.LocalDate;

public class RentalDTO {
    private Long id;
    private Long renterId;
    private Long carId;
    private LocalDate start;
    private LocalDate end;
    private String status;



    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getRenterId() { return renterId; }
    public void setRenterId(Long renterId) { this.renterId = renterId; }

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }

    public LocalDate getStartDate() { return start; }
    public void setStartDate(LocalDate start) { this.start = start; }

    public LocalDate getEndDate() { return end; }
    public void setEndDate(LocalDate end) { this.end = end; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
