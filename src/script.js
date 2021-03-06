function formatDay(timestamp) {
  //gets a timestamp for the api
  //returns days starting with tomorrow
  let date = new Date(timestamp * 1000);
  let day = date.getDay() + 1;
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return days[day];
}

function displayForecast(response) {
  //integrates api to display a 6 day forecast
  let forecast = response.data.daily;
  let cityForecast = document.querySelector(".five-day-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += ` <div class="col">
            <span class="forecast-day">${formatDay(forecastDay.dt)}</span>
            </br>
            <img 
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" 
            alt="" 
            width = "50"
            />
            </br>
            <div class="forecast-temp">
            <span class="max-temp">${Math.round(
              forecastDay.temp.max
            )}</span>°|<span class="min-temp">${Math.round(
        forecastDay.temp.min
      )}</span>°
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  cityForecast.innerHTML = forecastHTML;
}

function formatDate() {
  //formats date for last updated
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let day = days[now.getDay()];
  let seconds = now.getSeconds();

  //time is given in military time
  //change to standard am/pm time
  let period = `am`;
  if (hours > 12) {
    hours = hours - 12;
    period = `pm`;
    if (hours < 10) {
      hours = `0${hours}`;
    } else {
      hours = `${hours}`;
    }
  }
  return `${day} ${hours}:${minutes} ${period}`;
}

function getForecast(coordinates) {
  //to get forecast need to use the coordinates of the searched city
  let apiKey = `3c0824dc32f687bca423dec021170f3a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function getCityWeatherInfo(response) {
  //changes html to be inputed city weather information
  let searchedCity = response.data.name;
  let searchedCityCountry = response.data.sys.country;

  let currentCity = document.querySelector("#city-country");
  currentCity.innerHTML = `${searchedCity}, ${searchedCityCountry}`;

  fahrenheitTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${fahrenheitTemp}`;

  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = response.data.main.humidity;

  let cityWindSpeed = document.querySelector("#wind-speed");
  cityWindSpeed.innerHTML = Math.round(response.data.wind.speed);

  let cityFeelsLike = document.querySelector("#feels-like");
  cityFeelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°F`;

  let cityForecast = document.querySelector("#forecast");
  cityForecast.innerHTML = response.data.weather[0].description;

  let currentDate = document.querySelector("#date-time");
  currentDate.innerHTML = formatDate();

  let tempIcon = document.querySelector("#icon");
  tempIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
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

function displayCelsiusTemp(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let cityTemp = document.querySelector(".temperature");
  let celsiusTemp = (fahrenheitTemp - 32) * (5 / 9);
  cityTemp.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  let cityTemp = document.querySelector(".temperature");
  cityTemp.innerHTML = fahrenheitTemp;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let currentPosition = `lat=${lat}&lon=${long}`;
  let unit = `imperial`;

  let apiKey = `c6b9367bef797caf22641835dadfda42`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${currentPosition}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getCityWeatherInfo);
}

function geoLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector(".current-location-button");
currentLocation.addEventListener("click", geoLocation);

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", applySubmit);

let fahrenheitTemp = null;
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

searchCity("New York");
