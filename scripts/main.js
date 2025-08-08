import { fetchNasaApod } from "./nasaApod.mjs";
import { createStars, createShootingStar } from "./starrySky.mjs";
import { renderRandomQuote } from "./quote.mjs";
import { getMoonPhaseData, getCurrentMoonPhase } from "./moonPhase.mjs";
import { getNextVisibleISSPass } from "./issTracker.mjs";
import { displayYear, lastModified } from "./getDates.mjs";

window.onload = function () {
  // this code tells the page to run displayYear() when the page loads to the element that has the first incidence of the id of "displayYear".
  displayYear();
  // this code tells the page to run lastModified() when the page loads to the element that has the first incidence of the id of "lastModified".
  lastModified();
};

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("apod-date");
  const now = new Date();

  // Get UTC parts for current date
  const localYear = now.getFullYear();
  const localMonth = (now.getMonth() + 1).toString().padStart(2, "0");
  const localDay = now.getDate().toString().padStart(2, "0");

  const localTodayStr = `${localYear}-${localMonth}-${localDay}`;

  dateInput.max = localTodayStr;
  dateInput.value = localTodayStr;

  // Load today’s APOD on page load
  fetchNasaApod(localTodayStr);

  console.log("Set local date input value:", dateInput.value);

  dateInput.addEventListener("change", () => {
    const selectedDate = dateInput.value;
    if (selectedDate > utcTodayStr) {
      alert("APOD data is not available for future dates.");
      dateInput.value = utcTodayStr;
      return;
    }
    fetchNasaApod(selectedDate);
  });

  // Render random quote and current moon phase
  renderRandomQuote();
  getCurrentMoonPhase(utcTodayStr);

  // --- Restore saved moon form values ---
  const savedMoonLat = localStorage.getItem("moonLat");
  const savedMoonLon = localStorage.getItem("moonLon");
  if (savedMoonLat !== null) document.getElementById("latitude").value = savedMoonLat;
  if (savedMoonLon !== null) document.getElementById("longitude").value = savedMoonLon;

  // --- Restore saved ISS form values ---
  const savedIssLat = localStorage.getItem("issLat");
  const savedIssLon = localStorage.getItem("issLon");
  if (savedIssLat !== null) document.getElementById("iss-latitude").value = savedIssLat;
  if (savedIssLon !== null) document.getElementById("iss-longitude").value = savedIssLon;
});

createStars(1000);

function shootingStarLoop() {
  createShootingStar();

  // Call again after random delay between 2 and 7 seconds
  setTimeout(shootingStarLoop, 2000 + Math.random() * 5000);
}

// Start the loop
shootingStarLoop();


// Moon phase form submit handler
document.getElementById("location-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const lat = document.getElementById("latitude").value;
  const lon = document.getElementById("longitude").value;

  getMoonPhaseData(lat, lon);

  // Save to localStorage
  localStorage.setItem("moonLat", lat);
  localStorage.setItem("moonLon", lon);
});

// ISS form submit handler
document.getElementById("iss-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const lat = parseFloat(document.getElementById("iss-latitude").value);
  const lon = parseFloat(document.getElementById("iss-longitude").value);
  const alt = 0;

  // Save to localStorage
  localStorage.setItem("issLat", lat);
  localStorage.setItem("issLon", lon);

  getNextVisibleISSPass(lat, lon, alt);
});
