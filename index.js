async function fetchWeatherAlerts(state) {
  const input = document.querySelector('input');
  const alertsDisplay = document.querySelector('#alerts-display');
  const errorDiv = document.querySelector('#error-message');

  input.value = '';

  try {
    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
    const data = await response.json();

    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');

    const count = data.features.length;
    alertsDisplay.innerHTML = `<p>${data.title}: ${count}</p>`;

    data.features.forEach((feature) => {
      const p = document.createElement('p');
      p.textContent = feature.properties.headline;
      alertsDisplay.appendChild(p);
    });

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');
  const input = document.querySelector('input');

  button.addEventListener('click', () => {
    const state = input.value;
    fetchWeatherAlerts(state);
  });
});