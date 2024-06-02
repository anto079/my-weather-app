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
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", changeCity);
searchCity("Cottbus");
