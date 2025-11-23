-- Δημιουργία users
INSERT INTO users (id, name, email, password, role) VALUES (1, 'Owner One', 'owner1@mail.com', 'pass1', 'OWNER');
INSERT INTO users (id, name, email, password, role) VALUES (2, 'Renter One', 'renter1@mail.com', 'pass2', 'RENTER');
INSERT INTO users (id, name, email, password, role) VALUES (3, 'Owner Two', 'owner2@mail.com', 'pass3', 'OWNER');
INSERT INTO users (id, name, email, password, role) VALUES (4, 'Renter Two', 'renter2@mail.com', 'pass4', 'RENTER');

-- Δημιουργία cars
INSERT INTO cars (id, model, car_year, cc, price_per_day, address, latitude, longitude, available_from, available_until, owner_id)
VALUES (1, 'Toyota Yaris', 2018, 1300, 25.00, 'Athens Center', 37.9838, 23.7275, '2025-09-01', '2025-09-30', 1);

INSERT INTO cars (id, model, car_year, cc, price_per_day, address, latitude, longitude, available_from, available_until, owner_id)
VALUES (2, 'Ford Focus', 2020, 1600, 30.00, 'Thessaloniki', 40.6401, 22.9444, '2025-09-05', '2025-09-25', 3);

-- Δημιουργία rentals
INSERT INTO rental_requests (id, renter_id, car_id, start_date, end_date, status)
VALUES (1, 2, 1, '2025-09-10', '2025-09-15', 'PENDING');

INSERT INTO rental_requests (id, renter_id, car_id, start_date, end_date, status)
VALUES (2, 4, 2, '2025-09-12', '2025-09-18', 'APPROVED');

-- Δημιουργία reviews
INSERT INTO reviews (id, reviewer_id, reviewee_id, rating, comment)
VALUES (1, 2, 1, 5, 'Great owner, smooth rental!');

INSERT INTO reviews (id, reviewer_id, reviewee_id, rating, comment)
VALUES (2, 4, 3, 4, 'Good car, friendly owner.');
