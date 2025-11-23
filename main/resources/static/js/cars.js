import { API_BASE } from './api.js';

const carsTable = document.querySelector("#carsTable tbody");
const addCarForm = document.getElementById("addCarForm");

async function loadCars() {
    carsTable.innerHTML = "";
    try {
        const res = await fetch(`${API_BASE}/cars`);
        if (!res.ok) throw new Error("Αποτυχία φόρτωσης αυτοκινήτων");
        const cars = await res.json();

        cars.forEach(car => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.id}</td>
                <td>${car.model}</td>
                <td>${car.carYear}</td>
                <td>${car.cc}</td>
                <td>${car.pricePerDay}</td>
                <td>${car.address}</td>
                <td>${car.owner ? car.owner.id : "-"}</td>
                <td>
                    <button class="edit-btn" data-id="${car.id}" data-model="${car.model}" data-year="${car.carYear}" data-cc="${car.cc}" data-price="${car.pricePerDay}" data-address="${car.address}">Επεξεργασία</button>
                    <button class="delete-btn" data-id="${car.id}">Διαγραφή</button>
                </td>
            `;
            carsTable.appendChild(row);
        });

        document.querySelectorAll(".edit-btn").forEach(btn =>
            btn.addEventListener("click", handleEdit)
        );
        document.querySelectorAll(".delete-btn").forEach(btn =>
            btn.addEventListener("click", handleDelete)
        );

    } catch (err) {
        console.error("Σφάλμα κατά τη φόρτωση αυτοκινήτων:", err);
    }
}

addCarForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const car = {
        model: document.getElementById("carModel").value,
        carYear: parseInt(document.getElementById("carYear").value),
        cc: parseInt(document.getElementById("carCC").value),
        pricePerDay: parseFloat(document.getElementById("carPrice").value),
        address: document.getElementById("carAddress").value,
        owner: { id: parseInt(document.getElementById("carOwnerId").value) }
    };

    try {
        const res = await fetch(`${API_BASE}/cars`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car)
        });

        if (!res.ok) {
            alert("Αποτυχία προσθήκης αυτοκινήτου");
            return;
        }

        addCarForm.reset();
        loadCars();

    } catch (err) {
        console.error("Σφάλμα κατά την προσθήκη αυτοκινήτου:", err);
    }
});

async function handleEdit(e) {
    const id = e.target.dataset.id;
    const newModel = prompt("Εισάγετε νέο μοντέλο:", e.target.dataset.model);
    const newYear = prompt("Εισάγετε νέο έτος:", e.target.dataset.year);
    const newCC = prompt("Εισάγετε νέα χωρητικότητα (cc):", e.target.dataset.cc);
    const newPrice = prompt("Εισάγετε νέα τιμή/ημέρα:", e.target.dataset.price);
    const newAddress = prompt("Εισάγετε νέα διεύθυνση:", e.target.dataset.address);

    if (!newModel || !newYear || !newCC || !newPrice || !newAddress) return;

    try {
        const res = await fetch(`${API_BASE}/cars/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: newModel,
                carYear: parseInt(newYear),
                cc: parseInt(newCC),
                pricePerDay: parseFloat(newPrice),
                address: newAddress
            })
        });

        if (!res.ok) {
            alert("Αποτυχία ενημέρωσης αυτοκινήτου");
            return;
        }

        loadCars();

    } catch (err) {
        console.error("Σφάλμα κατά την ενημέρωση αυτοκινήτου:", err);
    }
}

async function handleDelete(e) {
    const id = e.target.dataset.id;
    if (!confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το αυτοκίνητο;")) return;

    try {
        const res = await fetch(`${API_BASE}/cars/${id}`, { method: "DELETE" });
        if (!res.ok) {
            alert("Αποτυχία διαγραφής αυτοκινήτου");
            return;
        }

        loadCars();

    } catch (err) {
        console.error("Σφάλμα κατά τη διαγραφή αυτοκινήτου:", err);
    }
}

loadCars();
