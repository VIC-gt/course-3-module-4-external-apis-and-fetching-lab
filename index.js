const input = document.getElementById("stateInput");
const button = document.getElementById("getAlertsBtn");
const displayDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

// Fetch
async function fetchWeatherData(state) {
  const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

  if (!response.ok) {
    throw new Error("network failure"); // ✅ FIXED
  }

  return await response.json();
}

// Display success
function displayWeather(data) {
  displayDiv.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  const alerts = data.features;

  const header = document.createElement("h2");
  header.textContent = `Weather Alerts: ${alerts.length}`;
  displayDiv.appendChild(header);

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    displayDiv.appendChild(p);
  });
}

// Display error
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");

  displayDiv.innerHTML = "";
}

// Click
button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  if (!state) {
    displayError("network issue"); // ✅ FIXED
    return;
  }

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data);

    input.value = "";

  } catch (error) {
    displayError("network failure"); // ✅ FIXED
  }
});