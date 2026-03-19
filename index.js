const weatherApi = "https://api.weather.gov/alerts/active?area="

function fetchWeatherAlerts(state) {
  fetch(`${weatherApi}${state}`)
    .then(response => response.json())
    .then(data => displayAlerts(data))
    .catch(error => {
      const errorDiv = document.getElementById('error-message');
      errorDiv.textContent = error.message;
      errorDiv.classList.remove('hidden');
    });
}

function displayAlerts(data) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');

  const alertsDiv = document.getElementById('alerts-display');
  alertsDiv.innerHTML = '';

  const features = data.features;

  const summary = document.createElement('p');
  summary.textContent = `Weather Alerts: ${features.length}`;
  alertsDiv.appendChild(summary);

  features.forEach(alert => {
    const p = document.createElement('p');
    p.textContent = alert.properties.headline;
    alertsDiv.appendChild(p);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');
  const input = document.querySelector('input');

  button.addEventListener('click', () => {
    const state = input.value;
    input.value = '';
    fetchWeatherAlerts(state);
  });
});