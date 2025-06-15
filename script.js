const apiKey = "84a6e617c2f684a1cf3d865b14e9e9e8"; // 🔁 Replace this with your actual API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const loadingSpinner = document.getElementById("loadingSpinner");
const errorMessage = document.getElementById("errorMessage");
const weatherCard = document.getElementById("weatherCard");

const cityNameElem = document.getElementById("cityName");
const currentDateElem = document.getElementById("currentDate");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }
    fetchWeather(city);
});

async function fetchWeather(city) {
    // Reset states
    weatherCard.classList.add("hidden");
    errorMessage.classList.add("hidden");
    loadingSpinner.classList.remove("hidden");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        errorMessage.classList.remove("hidden");
    } finally {
        loadingSpinner.classList.add("hidden");
    }
}

function displayWeather(data) {
    const date = new Date();

    cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
    currentDateElem.textContent = date.toDateString();

    temperature.textContent = Math.round(data.main.temp);
    weatherCondition.textContent = data.weather[0].main;
    feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    pressure.textContent = `${data.main.pressure} hPa`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherCard.classList.remove("hidden");


//   const toggleBtn = document.getElementById("navToggle");
//     const navLinks = document.querySelector(".nav-links");

//     toggleBtn.addEventListener("click", () => {
//       navLinks.classList.toggle("active");
//     });
}
