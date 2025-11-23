export const API_BASE = "http://localhost:8080";


export async function createOwner(name, email, password) {
    const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "OWNER" })
    });
    return res.json();
}


export async function createRenter(name, email, password) {
    const res = await fetch(`${API_BASE}/users/renters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API_BASE}/users`);
    return res.json();
}

export async function createCar(car) {
    const res = await fetch(`${API_BASE}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car)
    });
    return res.json();
}

export async function getCars() {
    const res = await fetch(`${API_BASE}/cars`);
    return res.json();
}

export async function createRental(renterId, carId, start, end) {
    const res = await fetch(`${API_BASE}/rentals?renterId=${renterId}&carId=${carId}&start=${start}&end=${end}`, {
        method: "POST"
    });
    return res.json();
}

export async function updateRentalStatus(id, status) {
    const res = await fetch(`${API_BASE}/rentals/${id}/status?status=${status}`, {
        method: "PUT"
    });
    return res.json();
}

export async function getRentals() {
    const res = await fetch(`${API_BASE}/rentals`);
    return res.json();
}

export async function createReview(reviewerId, revieweeId, rating, comment) {
    const res = await fetch(`${API_BASE}/reviews?reviewerId=${reviewerId}&revieweeId=${revieweeId}&rating=${rating}&comment=${encodeURIComponent(comment)}`, {
        method: "POST"
    });
    return res.json();
}

export async function getReviews() {
    const res = await fetch(`${API_BASE}/reviews`);
    return res.json();
}

export async function getReviewsForUser(userId) {
    const res = await fetch(`${API_BASE}/reviews/user/${userId}`);
    return res.json();
}

export async function updateOwner(id, owner) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(owner)
    });
    return res.json();
}

export async function deleteOwner(id) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE"
    });
    return res.json();
}

