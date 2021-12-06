// function getCityAndTemp(response) {
//   //changes html to be inputed city and the associated country
//   let searchedCity = response.data.name;
//   let searchedCityCountry = response.data.sys.country;

//   let currentCity = document.querySelector("#city-country");
//   currentCity.innerHTML = `${searchedCity}, ${searchedCityCountry}`;

//   let cityTemp = Math.round(response.data.main.temp);
//   let currentTemp = document.querySelector(".temperature");
//   currentTemp.innerHTML = `${cityTemp}°F`;
// }

// function changeCity(event) {
//   //gets inputed city
//   event.preventDefault();
//   let cityInput = document.querySelector("#search-input");
//   let searchedCity = cityInput.value;

//   let unit = `imperial`;
//   let apiKey = `3c0824dc32f687bca423dec021170f3a`;
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${unit}`;
//   axios.get(apiUrl).then(getCityAndTemp);
// }

// function showPosition(position) {
//   let lat = position.coords.latitude;
//   let long = position.coords.longitude;
//   let currentPosition = `lat=${lat}&lon=${long}`;
//   let unit = `imperial`;

//   let apiKey = `c6b9367bef797caf22641835dadfda42`;
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${currentPosition}&appid=${apiKey}&units=${unit}`;
//   axios.get(apiUrl).then(getCityAndTemp);
// }

// function geoLocation() {
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

// let citySearch = document.querySelector("#search-form");
// citySearch.addEventListener("submit", changeCity);

// let currentLocation = document.querySelector(".current-location-button");
// currentLocation.addEventListener("click", geoLocation);
