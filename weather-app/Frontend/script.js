let cityName = document.querySelector("#searchInp");
let showName = document.querySelector("h1");
let temp = document.querySelector(".temp");
let feels = document.querySelector("#feels");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");

function updateUI(data) {
  showName.textContent = data.location.name;
  showName.style.textTransform = "capitalize";
  temp.textContent = data.current.temp_c + "°C";
  feels.textContent = data.current.feelslike_c + "°C";
  wind.textContent = data.current.wind_kph + " km/h";
  humidity.textContent = data.current.humidity + "%";
}

function getweather(city) {
  const url = `/weather?city=${city}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // full API response
      updateUI(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

// Manual search on Enter key
cityName.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getweather(cityName.value);
  }
});

// Auto fetch weather on page load (using geolocation)
window.onload = function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getweather(`${lat},${lon}`);
  });
};
