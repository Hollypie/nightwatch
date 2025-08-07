const apiKey = 'ZHKQSR-BHY3F5-UKLRU8-5JN3';
const satelliteId = 25544; // ISS NORAD ID


export async function getNextVisibleISSPass(lat, lon, alt = 0) {
  const url = `http://localhost:3000/iss?lat=${lat}&lon=${lon}&alt=${alt}`;
  const response = await fetch(url);
  const data = await response.json();
  const resultEl = document.getElementById('iss-result');

    if (data.passes && data.passes.length > 0) {
    const nextPass = data.passes[0];
    const date = new Date(nextPass.startUTC * 1000);
    const duration = nextPass.duration;

    const message = `Next visible ISS pass: ${date.toLocaleString()} for ${duration} seconds.`;
    console.log(message);
    resultEl.textContent = message;
    } else {
    resultEl.textContent = "No visible passes in the next few days.";
    }

}