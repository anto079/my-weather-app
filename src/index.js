function changeCity(event) {
  event.preventDefault();
  let searchInput = document.getElementById("enter-city");

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = searchInput.value;
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", changeCity);
