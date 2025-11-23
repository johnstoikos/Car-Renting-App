import { API_BASE } from './api.js';

const map = L.map('map').setView([37.9838, 23.7275], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; Συντελεστές του OpenStreetMap'
}).addTo(map);

async function loadCarsOnMap() {
  try {
    const res = await fetch(`${API_BASE}/cars`);
    if (!res.ok) throw new Error("Αποτυχία φόρτωσης αυτοκινήτων");
    const cars = await res.json();

    for (const car of cars) {
      let lat = car.latitude;
      let lon = car.longitude;

      if (!lat || !lon) {
        if (!car.address) continue;
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(car.address)}`
        );
        const geoData = await geoRes.json();
        if (geoData.length === 0) continue;

        lat = parseFloat(geoData[0].lat);
        lon = parseFloat(geoData[0].lon);
      }

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`
          <b>${car.model}</b><br>
          ${car.address || "Χωρίς διεύθυνση"}<br>
          Τιμή/ημέρα: €${car.pricePerDay}
        `);
    }

  } catch (err) {
    console.error("Σφάλμα κατά τη φόρτωση αυτοκινήτων στο χάρτη:", err);
  }
}

loadCarsOnMap();
