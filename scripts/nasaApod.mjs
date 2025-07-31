// nasaApod.js
const apiKey = "GNWxNeShVkTzSnEOim5Ubq32zRAypKzGjW6hvGKV";

export async function fetchNasaApod(date = "") {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ''}`;


  // Show loading spinner and clear previous messages
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").textContent = "";
  document.getElementById("title").textContent = "";
  document.getElementById("date").textContent = "";
  document.getElementById("pic").src = "";
  document.getElementById("explanation").textContent = "";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();

    document.getElementById("title").textContent = data.title;
    document.getElementById("date").textContent = data.date;

    const mediaEl = document.getElementById("pic");
    if (data.media_type === "image") {
      mediaEl.src = data.hdurl || data.url;
      mediaEl.style.display = "block";
    } else {
      mediaEl.style.display = "none";
    }

    document.getElementById("explanation").textContent = data.explanation;
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("error").textContent = "Failed to load APOD: " + error.message;
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}
