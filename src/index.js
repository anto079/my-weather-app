function updateWeather(response) {
  let updatedTemp = document.querySelector(".current-temp-number");
  let currentTemp = Math.round(response.data.temperature.current);
  updatedTemp.innerHTML = currentTemp;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `${currentHumidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  let currentSpeed = response.data.wind.speed;
  windSpeed.innerHTML = `${currentSpeed}km/h`;
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date);
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-emoji"/>`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
    if (hours < 10) {
      hours = `0${hours}`;
    }
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2t553f9381106a3576b3bf8c8coa7bc4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.getElementById("enter-city");

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "2t553f9381106a3576b3bf8c8coa7bc4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
   <img class="weather-forecast-icon"src="${day.condition.icon_url}"/>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}º</strong>
      </div>
      <div class="weather-forecast-temperature">${Math.round(
        day.temperature.minimum
      )}º</div>
    </div>
   </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", changeCity);
searchCity("Cottbus");
getForecast("Cottbus");
displayForecast();
