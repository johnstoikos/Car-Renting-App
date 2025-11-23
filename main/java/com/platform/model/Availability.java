package com.platform.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Availability {

    @Column(name = "available_from")
    private LocalDate start;

    @Column(name = "available_until")
    private LocalDate end;

    public LocalDate getStart() { return start; }
    public void setStart(LocalDate start) { this.start = start; }

    public LocalDate getEnd() { return end; }
    public void setEnd(LocalDate end) { this.end = end; }
}
