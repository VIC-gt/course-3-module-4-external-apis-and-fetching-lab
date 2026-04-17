const input = document.getElementById("stateInput");
const button = document.getElementById("getAlertsBtn");
const alertsDiv = document.getElementById("alerts");
const errorP = document.getElementById("error");
const title = document.getElementById("title");

// Fetch weather alerts
async function fetchWeatherData(state) {
  const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

  if (!response.ok) {
    throw new Error("Network failure");
  }

  const data = await response.json();
  return data;
}

// Display weather alerts
function displayWeather(data) {
  alertsDiv.innerHTML = "";
  errorP.textContent = "";

  const alerts = data.features;

  // Extract state name properly
  const stateName = data.title.includes("for")
    ? data.title.split("for ")[1]
    : "Selected State";

  title.textContent = `Current watches, warnings, and advisories for ${stateName}: ${alerts.length}`;

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDiv.appendChild(p);
  });
}

// Display error message
function displayError(message) {
  errorP.textContent = message;
  alertsDiv.innerHTML = "";
  title.textContent = "";
}

// Button click event
button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  if (!state) {
    displayError("Please enter a state abbreviation");
    return;
  }

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data);

    // Clear input after success
    input.value = "";

  } catch (error) {
    displayError("Network failure");
  }
});