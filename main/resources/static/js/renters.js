const rentersTable = document.querySelector("#rentersTable tbody");

async function loadRenters() {
    try {
        const res = await fetch("http://localhost:8080/users/renters");
        if (!res.ok) throw new Error("Αποτυχία φόρτωσης ενοικιαστών");

        const renters = await res.json();

        rentersTable.innerHTML = "";
        renters.forEach(r => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${r.id}</td>
                <td>${r.name}</td>
                <td>${r.email}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editRenter(${r.id}, '${r.name}', '${r.email}')">Επεξεργασία</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteRenter(${r.id})">Διαγραφή</button>
                </td>

            `;
            rentersTable.appendChild(row);
        });
    } catch (err) {
        console.error("Σφάλμα κατά τη φόρτωση ενοικιαστών:", err);
    }
}

async function addRenter(event) {
    event.preventDefault();

    const name = document.querySelector("#renterName").value.trim();
    const email = document.querySelector("#renterEmail").value.trim();
    const password = document.querySelector("#renterPassword").value.trim();

    try {
        const res = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role: "RENTER" })
        });

        if (!res.ok) {
            const errMsg = await res.text();
            alert("Σφάλμα: " + errMsg);
            return;
        }

        document.querySelector("#addRenterForm").reset();

        await loadRenters();
    } catch (err) {
        console.error("Σφάλμα κατά την προσθήκη ενοικιαστή:", err);
    }
}

async function deleteRenter(id) {
    if (!confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον ενοικιαστή;")) return;

    try {
        const res = await fetch(`http://localhost:8080/users/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error("Αποτυχία διαγραφής ενοικιαστή");
        await loadRenters();
    } catch (err) {
        alert("Σφάλμα κατά τη διαγραφή ενοικιαστή");
        console.error(err);
    }
}

async function editRenter(id, currentName, currentEmail) {
    const newName = prompt("Εισάγετε νέο όνομα:", currentName);
    const newEmail = prompt("Εισάγετε νέο email:", currentEmail);
    const newPassword = prompt("Εισάγετε νέο κωδικό:");

    if (!newName || !newEmail || !newPassword) return;

    try {
        const res = await fetch(`http://localhost:8080/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newName,
                email: newEmail,
                password: newPassword,
                role: "RENTER"
            })
        });

        if (!res.ok) throw new Error("Αποτυχία ενημέρωσης ενοικιαστή");
        await loadRenters();
    } catch (err) {
        alert("Σφάλμα κατά την ενημέρωση ενοικιαστή");
        console.error(err);
    }
}

document.querySelector("#addRenterForm").addEventListener("submit", addRenter);
loadRenters();

window.deleteRenter = deleteRenter;
window.editRenter = editRenter;
