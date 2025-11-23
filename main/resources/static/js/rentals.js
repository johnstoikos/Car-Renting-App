import { API_BASE } from './api.js';

const rentalsTable = document.getElementById("rentalsTable").querySelector("tbody");
const addRentalForm = document.getElementById("addRentalForm");

async function loadRentals() {
    rentalsTable.innerHTML = "";
    try {
        const res = await fetch(`${API_BASE}/rentals`);
        if (!res.ok) throw new Error("Αποτυχία φόρτωσης ενοικιάσεων");
        const rentals = await res.json();

        rentals.forEach(r => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${r.id}</td>
                <td>${r.renterId ?? "-"}</td>
                <td>${r.carId ?? "-"}</td>
                <td>${r.startDate ?? "-"}</td>
                <td>${r.endDate ?? "-"}</td>
                <td>${r.status}</td>
                <td>
                    <button class="delete-btn" data-id="${r.id}">Διαγραφή</button>
                </td>
            `;
            rentalsTable.appendChild(row);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", handleDelete);
        });

    } catch (err) {
        console.error("Σφάλμα κατά τη φόρτωση ενοικιάσεων:", err);
    }
}

addRentalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const renterId = document.getElementById("renterId").value;
    const carId = document.getElementById("carId").value;
    const start = document.getElementById("Έναρξη").value;
    const end = document.getElementById("Λήξη").value;


    try {
        const res = await fetch(
            `${API_BASE}/rentals?renterId=${renterId}&carId=${carId}&start=${start}&end=${end}`,
            { method: "POST" }
        );

        if (!res.ok) throw new Error("Αποτυχία προσθήκης ενοικίασης");

        addRentalForm.reset();
        loadRentals();

    } catch (err) {
        console.error("Σφάλμα κατά την προσθήκη ενοικίασης:", err);
    }
});

async function handleDelete(e) {
    const id = e.target.dataset.id;
    if (!confirm("Θέλετε σίγουρα να διαγράψετε αυτήν την ενοικίαση;")) return;

    try {
        const res = await fetch(`${API_BASE}/rentals/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Αποτυχία διαγραφής ενοικίασης");
        loadRentals();
    } catch (err) {
        console.error("Σφάλμα κατά τη διαγραφή ενοικίασης:", err);
    }
}

loadRentals();
