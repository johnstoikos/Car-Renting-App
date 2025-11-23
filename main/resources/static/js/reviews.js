import { API_BASE } from './api.js';

const reviewsTable = document.querySelector("#reviewsTable tbody");
const addReviewForm = document.getElementById("addReviewForm");

async function loadReviews() {
    reviewsTable.innerHTML = "";
    try {
        const res = await fetch(`${API_BASE}/reviews`);
        if (!res.ok) throw new Error("Αποτυχία φόρτωσης κριτικών");
        const reviews = await res.json();

        reviews.forEach(r => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${r.id}</td>
                <td>${r.reviewerId}</td>
                <td>${r.revieweeId}</td>
                <td>${r.rating}</td>
                <td>${r.comment}</td>
                <td>
                    <button class="edit-btn" data-id="${r.id}" data-rating="${r.rating}" data-comment="${r.comment}">Επεξεργασία</button>
                    <button class="delete-btn" data-id="${r.id}">Διαγραφή</button>
                </td>
            `;
            reviewsTable.appendChild(row);
        });

        document.querySelectorAll(".edit-btn").forEach(btn =>
            btn.addEventListener("click", handleEdit)
        );
        document.querySelectorAll(".delete-btn").forEach(btn =>
            btn.addEventListener("click", handleDelete)
        );

    } catch (err) {
        console.error("Σφάλμα κατά τη φόρτωση κριτικών:", err);
    }
}

addReviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const review = {
        reviewerId: parseInt(document.getElementById("reviewerId").value),
        revieweeId: parseInt(document.getElementById("revieweeId").value),
        rating: parseInt(document.getElementById("rating").value),
        comment: document.getElementById("comment").value
    };

    try {
        const res = await fetch(`${API_BASE}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review)
        });

        if (!res.ok) {
            alert("Αποτυχία προσθήκης κριτικής");
            return;
        }

        addReviewForm.reset();
        loadReviews();
    } catch (err) {
        console.error("Σφάλμα κατά την προσθήκη κριτικής:", err);
    }
});

async function handleEdit(e) {
    const id = e.target.dataset.id;
    const oldRating = e.target.dataset.rating;
    const oldComment = e.target.dataset.comment;

    const newRating = prompt("Δώστε νέα βαθμολογία (1-5):", oldRating);
    const newComment = prompt("Δώστε νέο σχόλιο:", oldComment);

    if (!newRating || !newComment) return;

    try {
        const res = await fetch(`${API_BASE}/reviews/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating: parseInt(newRating), comment: newComment })
        });

        if (!res.ok) {
            alert("Αποτυχία ενημέρωσης κριτικής");
            return;
        }

        loadReviews();

    } catch (err) {
        console.error("Σφάλμα κατά την ενημέρωση κριτικής:", err);
    }
}

async function handleDelete(e) {
    const id = e.target.dataset.id;
    if (!confirm("Θέλετε σίγουρα να διαγράψετε αυτήν την κριτική;")) return;

    try {
        const res = await fetch(`${API_BASE}/reviews/${id}`, { method: "DELETE" });
        if (!res.ok) {
            alert("Αποτυχία διαγραφής κριτικής");
            return;
        }

        loadReviews();

    } catch (err) {
        console.error("Σφάλμα κατά τη διαγραφή κριτικής:", err);
    }
}

loadReviews();
