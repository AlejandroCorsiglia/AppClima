const apiKey = '6ce498696f0835d15a38d6c14c038a56'; 
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

getWeatherBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Por favor ingresa una ciudad');
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
    
    try {
        const response = await fetch(url);
        
        // Verificar si la respuesta es exitosa (status 200)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.cod === '404') {
            alert('Ciudad no encontrada');
            return;
        }

        // Mostrar los datos
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperatura: ${data.main.temp} °C`;
        description.textContent = `Descripción: ${data.weather[0].description}`;
        humidity.textContent = `Humedad: ${data.main.humidity}%`;
        windSpeed.textContent = `Velocidad del viento: ${data.wind.speed} m/s`;

        weatherInfo.style.display = 'block';
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
        alert(`Hubo un error al obtener los datos del clima: ${error.message}`);
    }
}


