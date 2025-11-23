# Peer-to-Peer Car Sharing Platform

## Overview
This project is a **peer-to-peer car sharing platform** that allows users to act as **car owners** or **renters**.  
Through the platform:
- Owners can **register** their vehicles.
- Renters can **book** cars for specific dates.
- Users can **rate and review** each other after transactions.
- **The following project was for a university class**

---

## System Architecture

The application consists of three main layers:

### Backend (Spring Boot)
- Built with **Spring Boot** and **JPA/Hibernate**.  
- Provides **RESTful APIs (JSON)** for all operations.  
- Organized into packages:
  - **model** – JPA entities: `User`, `Car`, `RentalRequest`, `Review`
  - **repository** – `JpaRepository` interfaces with CRUD operations
  - **service** – Business logic (availability checks, email uniqueness)
  - **controller** – REST endpoints connecting backend and frontend via DTOs  

### Frontend (HTML/CSS/JavaScript)
- Includes the following pages:
  - `index.html` — landing page  
  - `owners.html` — owner management  
  - `renters.html` — renter management  
  - `cars.html` — car registration and editing  
  - `rentals.html` — rental management and history  
  - `reviews.html` — user rating and review submission  
  - `map.html` — car locations displayed on a map (*Leaflet + OpenStreetMap*)

- **CSS** defines a consistent theme (red navigation bar, semi-transparent panels).  
- **JavaScript** uses `fetch()` for asynchronous REST calls and dynamic updates.

### Database
- Implemented with **JPA/Hibernate** (initially using H2, easily portable to PostgreSQL).  
- Main tables:
  - `users` (id, name, email, password, role)  
  - `cars` (model, year, cc, pricePerDay, address, coordinates, owner_id)  
  - `rental_requests` (startDate, endDate, status, renter_id, car_id)  
  - `reviews` (reviewer_id, reviewee_id, rating, comment)

---

## UML Diagrams
The documentation includes:
- **Use Case Diagram** – main actors: Owner, Renter, Admin  
- **Class Diagram** – `User`, `Car`, `RentalRequest`, `Review` and their relationships  
- **Sequence & Activity Diagrams** – illustrate booking and review flows  
- **Component & Deployment Diagrams** – frontend-backend-DB architecture  
- **State Diagram** – rental lifecycle: REQUESTED → APPROVED → COMPLETED

---

## Issues & Solutions
| Problem | Solution |
|----------|-----------|
| StackOverflowError from circular references (User–Car) | Used `@JsonIgnoreProperties` and DTOs |
| Duplicate email entries | Added `existsByEmail()` and handled exceptions gracefully |
| Mismatch between `@RequestParam` and `@RequestBody` | Unified requests to use JSON body |
| Dynamic event binding not working | Used event delegation & exposed functions to `window` |
| Background image not displayed | Moved image to `static/images` and corrected path |

---

## ⚙️ How to Run

### Requirements
- **Maven** installed  
- **Java 17+** installed  

### Commands
```bash
mvn clean install
mvn spring-boot:run

