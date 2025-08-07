// main.js
import { fetchNasaApod } from "./nasaApod.mjs";
import { createStars, createShootingStar } from "./starrySky.mjs";
import { renderRandomQuote } from "./quote.mjs";
import { getMoonPhaseData, getCurrentMoonPhase } from "./moonPhase.mjs";
import { getNextVisibleISSPass } from "./issTracker.mjs";
import { getCurrentYear, displayYear, lastModified } from "./getDates.mjs";

window.onload = function() {
    // this code tells the page to run displayYear() when the page load to the element that has the first incidence of the id of "displayYear".
    displayYear();
    // this code tells the page to run lastModified() when the page loads to the element that has the first incidence of the id of "lastModified".
    lastModified();
}

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
  
  // --- Restore saved moon form values ---
  const savedMoonLat = localStorage.getItem('moonLat');
  const savedMoonLon = localStorage.getItem('moonLon');
  if (savedMoonLat !== null) document.getElementById('latitude').value = savedMoonLat;
  if (savedMoonLon !== null) document.getElementById('longitude').value = savedMoonLon;

  // --- Restore saved ISS form values ---
  const savedIssLat = localStorage.getItem('issLat');
  const savedIssLon = localStorage.getItem('issLon');
  if (savedIssLat !== null) document.getElementById('iss-latitude').value = savedIssLat;
  if (savedIssLon !== null) document.getElementById('iss-longitude').value = savedIssLon;

});

// Moon phase form submit handler
document.getElementById('location-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const lat = document.getElementById('latitude').value;
  const lon = document.getElementById('longitude').value;

  getMoonPhaseData(lat, lon);

  // Save to localStorage
  localStorage.setItem('moonLat', lat);
  localStorage.setItem('moonLon', lon);
});

// ISS form submit handler
document.getElementById('iss-form').addEventListener('submit', e => {
  e.preventDefault();
  const lat = parseFloat(document.getElementById('iss-latitude').value);
  const lon = parseFloat(document.getElementById('iss-longitude').value);
  const alt = 0;

  // Save to localStorage
  localStorage.setItem('issLat', lat);
  localStorage.setItem('issLon', lon);

  getNextVisibleISSPass(lat, lon, alt);
});

