const input = document.getElementById("stateInput");
const button = document.getElementById("getAlertsBtn");
const alertsDiv = document.getElementById("alerts");
const errorP = document.getElementById("error");
const title = document.getElementById("title");

// Fetch
async function fetchWeatherData(state) {
  const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

  if (!response.ok) {
    throw new Error("Network failure");
  }

  return await response.json();
}

// Display success
function displayWeather(data) {
  alertsDiv.innerHTML = "";
  errorP.textContent = "";

  // ✅ HIDE ERROR
  errorP.classList.add("hidden");

  const alerts = data.features;

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

// Display error
function displayError(message) {
  errorP.textContent = message;

  // ✅ SHOW ERROR
  errorP.classList.remove("hidden");

  alertsDiv.innerHTML = "";
  title.textContent = "";
}

// Click
button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  if (!state) {
    displayError("Please enter a state abbreviation");
    return;
  }

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data);

    // ✅ CLEAR INPUT
    input.value = "";

  } catch (error) {
    displayError("Network failure");
  }
});