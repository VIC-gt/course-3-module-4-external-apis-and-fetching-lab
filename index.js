const baseURL = "https://api.weather.gov/alerts?area=";

const input = document.getElementById("state-input");
const button = document.getElementById("get-weather");
const results = document.getElementById("results");
const errorBox = document.getElementById("error");


button.addEventListener("click", async function () {
  const state = input.value.trim().toUpperCase();

  errorBox.textContent = "";
  errorBox.style.display = "none";

  input.value = ""; // required test

  await fetchWeatherData(state);
});


async function fetchWeatherData(state) {
  try {
    if (!state) {
      displayError("State is required");
      return;
    }

    const response = await fetch(baseURL + state);

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const data = await response.json();

    displayWeather(data);

  } catch (err) {
    displayError("Failed to fetch weather alerts");
  }
}


function displayWeather(data) {
  results.innerHTML = "";

  errorBox.textContent = "";
  errorBox.style.display = "none";

  const alerts = data.features || [];

  const title = document.createElement("h2");
  title.textContent =
    `Current watches, warnings, and advisories: ${alerts.length}`;

  results.appendChild(title);

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    results.appendChild(p);
  });
}


function displayError(message) {
  results.innerHTML = "";

  errorBox.textContent = message;
  errorBox.style.display = "block";
}