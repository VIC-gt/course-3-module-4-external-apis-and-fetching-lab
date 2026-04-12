// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here! 
// ===============================
// DOM Elements
// ===============================
const input = document.getElementById("stateInput");
const button = document.getElementById("getWeatherBtn");
const output = document.getElementById("weatherOutput");

// ===============================
// Event Listener
// ===============================
button.addEventListener("click", () => {
  const state = input.value.trim();
  fetchWeatherData(state);
});

// ===============================
// 1. Fetch Weather Data
// ===============================
async function fetchWeatherData(state) {
  try {
    // Validate input
    if (!state) {
      displayError("Please enter a state abbreviation.");
      return;
    }

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    displayWeather(data);

  } catch (error) {
    displayError("Error fetching weather data. Try again.");
  }
}

// ===============================
// 2. Display Weather Data
// ===============================
function displayWeather(data) {
  output.innerHTML = "";

  // No alerts case
  if (!data.features || data.features.length === 0) {
    output.innerHTML = "<p>No active weather alerts.</p>";
    return;
  }

  data.features.forEach((alert) => {
    const div = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = alert.properties.headline || "No headline";

    const desc = document.createElement("p");
    desc.textContent = alert.properties.description || "No description";

    div.appendChild(title);
    div.appendChild(desc);

    output.appendChild(div);
  });
}

// ===============================
// 3. Display Error
// ===============================
function displayError(message) {
  output.innerHTML = "";

  const error = document.createElement("p");
  error.textContent = message;
  error.style.color = "red";

  output.appendChild(error);
}