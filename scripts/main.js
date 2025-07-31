// main.js
import { fetchNasaApod } from "./nasaApod.mjs";
import { createStars, createShootingStar } from "./starrySky.mjs";
import { renderRandomQuote } from "./quote.mjs";
import { getMoonPhaseData, getCurrentMoonPhase } from "./moonPhase.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("apod-date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.max = today;
  dateInput.value = today;

  // Load today’s APOD on page load
  fetchNasaApod(today);

  // Auto-load when date is selected
  dateInput.addEventListener("change", () => {
    const selectedDate = dateInput.value;
    if (selectedDate) {
      fetchNasaApod(selectedDate);
    }
  });
});

createStars(1000);

function shootingStarLoop() {
  createShootingStar();

  // Call again after random delay between 2 and 7 seconds
  setTimeout(shootingStarLoop, 2000 + Math.random() * 5000);
}

// Start the loop
shootingStarLoop();

// render the random quote and current moon phase
document.addEventListener('DOMContentLoaded', () => {
  renderRandomQuote();
  const currentDate = new Date().toISOString().slice(0, 10); 
  getCurrentMoonPhase(currentDate);
});

document.getElementById('location-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const lat = document.getElementById('latitude').value;
  const lon = document.getElementById('longitude').value;

  getMoonPhaseData(lat, lon);
});