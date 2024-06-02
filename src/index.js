function updateWeather(response) {
  let updatedTemp = document.querySelector(".current-temp-number");
  let currentTemp = Math.round(response.data.temperature.current);
  updatedTemp.innerHTML = currentTemp;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;
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
