import { API_BASE } from './api.js';

const ownersTable = document.getElementById("ownersTable").querySelector("tbody");
const addOwnerForm = document.getElementById("addOwnerForm");

async function loadOwners() {
    ownersTable.innerHTML = ""; 
    try {
        const response = await fetch(`${API_BASE}/users`);
        if (!response.ok) throw new Error("Αποτυχία φόρτωσης χρηστών");

        const users = await response.json();
        const owners = users.filter(u => u.role === "OWNER");

        owners.forEach(owner => {
            const row = ownersTable.insertRow();
            row.innerHTML = `
                <td>${owner.id}</td>
                <td>${owner.name}</td>
                <td>${owner.email}</td>
                <td>
                    <button class="edit-btn" data-id="${owner.id}" data-name="${owner.name}" data-email="${owner.email}">Επεξεργασία</button>
                    <button class="delete-btn" data-id="${owner.id}">Διαγραφή</button>
                </td>
            `;
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", handleEdit);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", handleDelete);
        });

    } catch (err) {
        console.error("Σφάλμα κατά τη φόρτωση ιδιοκτητών:", err);
    }
}

addOwnerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const owner = {
        name: document.getElementById("ownerName").value,
        email: document.getElementById("ownerEmail").value,
        password: document.getElementById("ownerPassword").value,
        role: "OWNER"
    };

    try {
        const response = await fetch(`${API_BASE}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(owner)
        });

        if (response.ok) {
            addOwnerForm.reset();
            loadOwners(); 
        } else {
            console.error("Αποτυχία προσθήκης ιδιοκτήτη");
        }
    } catch (err) {
        console.error("Σφάλμα κατά την προσθήκη ιδιοκτήτη:", err);
    }
});

async function handleEdit(e) {
    const id = e.target.dataset.id;
    const oldName = e.target.dataset.name;
    const oldEmail = e.target.dataset.email;

    const newName = prompt("Εισάγετε νέο όνομα:", oldName);
    const newEmail = prompt("Εισάγετε νέο email:", oldEmail);
    const newPassword = prompt("Εισάγετε νέο κωδικό:");

    if (!newName || !newEmail || !newPassword) return;

    try {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newName,
                email: newEmail,
                password: newPassword,
                role: "OWNER"  
            })
        });

        if (response.ok) {
            await loadOwners();
            alert("Ο ιδιοκτήτης ενημερώθηκε με επιτυχία!");
        } else {
            const error = await response.json();
            alert(`Αποτυχία ενημέρωσης ιδιοκτήτη: ${error.message || "Άγνωστο σφάλμα"}`);
        }
    } catch (err) {
        console.error("Σφάλμα κατά την ενημέρωση ιδιοκτήτη:", err);
        alert("Σφάλμα κατά την ενημέρωση ιδιοκτήτη.");
    }
}


async function handleDelete(e) {
    const id = e.target.dataset.id;

    if (!confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον ιδιοκτήτη;")) return;

    try {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            loadOwners();
        } else {
            console.error("Αποτυχία διαγραφής ιδιοκτήτη");
        }
    } catch (err) {
        console.error("Σφάλμα κατά τη διαγραφή ιδιοκτήτη:", err);
    }
}

loadOwners();
