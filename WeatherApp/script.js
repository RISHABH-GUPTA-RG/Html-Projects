fetch("./apikeyfile.json")
    .then((response) => response.json())
    .then((json) => API_KEY=json.API_KEY);

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const city = document.getElementById("city");
const temprature = document.getElementById("tempratrure");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("icon");
const cityWeather = document.getElementById("cityWeather");
const noCityFound = document.getElementById("noCityFound");

searchButton.addEventListener("click", updateWeatherData);
searchButton.addEventListener(
    "keydown",
    (event) => event.key === "Enter" && updateWeatherData()
);

async function updateWeatherData() {
    try {
        if (!searchInput.value.trim()) {
            alert("Please enter the city");
            return;
        }
        const weatherData = await getWeatherData(searchInput.value);
        console.log(weatherData);
        noCityFound.classList.add("hidden");
        cityWeather.classList.remove("hidden");
        city.textContent = weatherData.city;
        temprature.textContent = weatherData.temprature + "°C";
        humidity.textContent = weatherData.humidity + "%";
        wind.textContent = weatherData.wind + " km/hr";
        icon.src = weatherData.icon;
    } catch (error) {
        if (error?.code === "404") {
            cityWeather.classList.add("hidden");
            noCityFound.classList.remove("hidden");
            console.error(error.meesage);
        } else {
            alert("Unknow error: " + error);
        }
    }
}

function getIconUrl(icon) {
    return `./images/${icon.toLowerCase()}.png`;
}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const apiResponse = await fetch(apiUrl);
    const apiResponseBody = await apiResponse.json();

    if (apiResponseBody.cod == "404") {
        throw { code: "404", message: "City Not Found" };
    } else {
        console.log(apiResponseBody);
    }
    return {
        city: apiResponseBody.name,
        temprature: Math.round(apiResponseBody?.main?.temp),
        humidity: Math.round(apiResponseBody?.main?.humidity),
        wind: Math.round(apiResponseBody?.wind?.speed),
        icon: getIconUrl(apiResponseBody?.weather[0].main),
    };
}
