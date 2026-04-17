
const baseURL = "https://api.weather.gov/alerts/active?area=";

// DOM elements (MATCH TEST IDS)
const input = document.getElementById("state-input");
const button = document.getElementById("get-weather");
const display = document.getElementById("alerts-display");
const errorBox = document.getElementById("error-message");


// CLICK EVENT
button.addEventListener("click", async function () {
  const state = input.value.trim().toUpperCase();

  // clear error first
  errorBox.textContent = "";
  errorBox.classList.add("hidden");

  try {
    const response = await fetch(baseURL + state);

    if (!response.ok) {
      throw new Error("Network failure");
    }

    const data = await response.json();

    displayWeather(data);

  } catch (err) {
    displayError("Network failure");
  }

  // required: clear input
  input.value = "";
});


// DISPLAY DATA
function displayWeather(data) {
  display.innerHTML = "";

  errorBox.textContent = "";
  errorBox.classList.add("hidden");

  const alerts = data.features || [];

  const title = document.createElement("h2");
  title.textContent = `Weather Alerts: ${alerts.length}`;

  display.appendChild(title);

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    display.appendChild(p);
  });
}


// DISPLAY ERROR
function displayError(message) {
  display.innerHTML = "";

  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}