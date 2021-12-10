function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  // if (hours > 12) {
  //   hours = hours - 12;
  //   hours = `${hours}`;
  // }

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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getCityWeatherInfo(response) {
  //changes html to be inputed city weather information
  console.log(response);
  let searchedCity = response.data.name;
  let searchedCityCountry = response.data.sys.country;

  let currentCity = document.querySelector("#city-country");
  currentCity.innerHTML = `${searchedCity}, ${searchedCityCountry}`;

  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${cityTemp}°F`;

  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = response.data.main.humidity;

  let cityWindSpeed = document.querySelector("#wind-speed");
  cityWindSpeed.innerHTML = Math.round(response.data.wind.speed);

  let cityFeelsLike = document.querySelector("#feels-like");
  cityFeelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°F`;

  let cityForecast = document.querySelector("#forecast");
  cityForecast.innerHTML = response.data.weather[0].description;

  let currentDate = document.querySelector("#date-time");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

function searchCity(city) {
  //gets inputed city
  let apiKey = `3c0824dc32f687bca423dec021170f3a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getCityWeatherInfo);
}

function applySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}

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

searchCity("New York");
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", applySubmit);

// let currentLocation = document.querySelector(".current-location-button");
// currentLocation.addEventListener("click", geoLocation);
