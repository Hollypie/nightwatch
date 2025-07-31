export async function getMoonPhaseData(latitude, longitude) {
    const apiKey = '20b799dd80d84d31baf164711253107';

    const lat = latitude;
    const lon = longitude;
    const date = new Date().toISOString().slice(0, 10); 

    const url = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${lat},${lon}&dt=${date}`;

    try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();

                    // The moon phase info is here:
                    const moonPhase = data.astronomy.astro.moon_phase;
                    const moonrise = data.astronomy.astro.moonrise;
                    const moonset = data.astronomy.astro.moonset;

                    const moonsetText = moonset !== "No moonset"
                        ? `Moonset: ${moonset}`
                        : "Moonset does not occur today in your location.";

        
                    // Display moon phase on the page
                    document.getElementById('moon-phase-result').textContent = `Moon Phase: ${moonPhase}`;
                    document.querySelector('#moon_phase h3').style.display = 'none';
                    document.getElementById('phase-image').src = getMoonPhaseImage(moonPhase);
                    document.getElementById('moon-rise').textContent = `Moonrise: ${moonrise}`;
                    document.getElementById('moon-set').textContent = `${moonsetText}`;

                } catch (error) {
                    console.error('Error fetching moon data:', error);
                    document.getElementById('moon-phase').textContent = 'Failed to get moon data.';
                }

};

function getMoonPhaseImage(phase) {
  // phase is a number from 0 to 1 from the API
  
  if (phase === "First Quarter") {
    return '/images/moon_phases/first-quarter.webp';
  } else if (phase === "Full Moon") {
    return '/images/moon_phases/full-moon.webp';
  } else if (phase === "Last Quarter") {
    return '/images/moon_phases/last-quarter.webp';
  } else if (phase === "New Moon") {
    return '/images/moon_phases/new-moon.webp';
  } else if (phase === "Waning Crescent") {
    return '/images/moon_phases/waning-crescent.webp';
  } else if (phase === "Waning Gibbous") {
    return '/images/moon_phases/waning-gibbous.webp';
  } else if (phase === "Waxing Crescent") {
    return '/images/moon_phases/waxing-crescent.webp';
  } else if (phase === "Waxing Gibbous") {
    return '/images/moon_phases/waxing-gibbous.webp';
  }
  
  // fallback image
  return './images/moon_phases/moon-full-moon.svg';
}

export async function getCurrentMoonPhase(date) {
    const apiKey = '20b799dd80d84d31baf164711253107';
    const url = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=Orem&dt=${date}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const moonPhase = data.astronomy.astro.moon_phase;

        document.getElementById('moon-phase-result').textContent = `Moon Phase: ${moonPhase}`;
        document.querySelector('#moon_phase h3').style.display = 'none';
        document.querySelector('#phase-image').src = getMoonPhaseImage(moonPhase);

    } catch (error) {
        console.error('Error fetching moon data:', error);
        document.getElementById('moon-phase').textContent = 'Failed to get moon data.';
    }

}

    // <!-- <script>
    //     const apiKey = '20b799dd80d84d31baf164711253107'; // Replace this with your WeatherAPI.com key

    //         document.getElementById('location-form').addEventListener('submit', async (e) => {
    //             e.preventDefault();

    //             const lat = document.getElementById('latitude').value;
    //             const lon = document.getElementById('longitude').value;

    //             // Use today's date or get it dynamically
    //             const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    //             const url = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${lat},${lon}&dt=${date}`;

    //             try {
    //                 const response = await fetch(url);
    //                 if (!response.ok) throw new Error('Network response was not ok');
    //                 const data = await response.json();

    //                 // The moon phase info is here:
    //                 // data.astronomy.astro.moon_phase
    //                 const moonPhase = data.astronomy.astro.moon_phase;

    //                 // Display moon phase on the page
    //                 document.getElementById('moon-phase-result').textContent = `Moon Phase: ${moonPhase}`;
    //                 document.querySelector('#moon_phase h3').style.display = 'none';

    //             } catch (error) {
    //                 console.error('Error fetching moon data:', error);
    //                 document.getElementById('moon-phase').textContent = 'Failed to get moon data.';
    //             }
    //         });

    // </script> -->


// This link is a guide to the lunar phase API
// https://www.visualcrossing.com/resources/documentation/weather-api/how-to-include-sunrise-sunset-and-moon-phase-data-into-your-api-requests/




// async function showMoonPhaseImage(lat, lon, date) {
//   const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=moon_phase&start=${date}&end=${date}&timezone=auto`);
//   const data = await response.json();
  
//   const phase = data.daily.moon_phase[0]; // value between 0 and 1
  
//   const imgUrl = getMoonPhaseImage(phase);
  
//   const imgElement = document.getElementById('moon-phase-img');
//   if (imgElement) {
//     imgElement.src = imgUrl;
//     imgElement.alt = 'Moon phase image';
//   }
// }