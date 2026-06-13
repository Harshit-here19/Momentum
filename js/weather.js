// js/weather.js

const weatherIcons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌫️',
    Smoke: '🌫️',
    Dust: '🌫️'
};

// ==================== INIT ====================
export function initWeather() {
    const showWeather =
        localStorage.getItem('momentum_showWeather') !== 'false';

    if (!showWeather) return;

    // load cache first
    const cached = localStorage.getItem('momentum_weather');
    const cacheTime = localStorage.getItem('momentum_weatherTime');

    if (cached && cacheTime && Date.now() - Number(cacheTime) < 1800000) {
        displayWeather(JSON.parse(cached));
    }

    // fetch fresh
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
            () => fetchWeatherByCity('Gwalior')
        );
    } else {
        fetchWeatherByCity('Gwalior');
    }
}

// ==================== FETCH BY COORDS ====================
function fetchWeather(lat, lon) {
    fetch(`https://wttr.in/${lat},${lon}?format=j1`)
        .then(res => res.json())
        .then(data => {
            const current = data.current_condition[0];

            const weatherData = {
                temp: current.temp_C,
                desc: current.weatherDesc[0].value,
                humidity: current.humidity,
                wind: current.windspeedKmph,
                feelsLike: current.FeelsLikeC,
                city: data.nearest_area?.[0]?.areaName?.[0]?.value || 'Unknown',
                main: mapWeather(current.weatherDesc[0].value)
            };

            saveAndDisplay(weatherData);
        })
        .catch(displayDefault);
}

// ==================== FETCH BY CITY ====================
function fetchWeatherByCity(city) {
    fetch(`https://wttr.in/${city}?format=j1`)
        .then(res => res.json())
        .then(data => {
            const current = data.current_condition[0];

            const weatherData = {
                temp: current.temp_C,
                desc: current.weatherDesc[0].value,
                humidity: current.humidity,
                wind: current.windspeedKmph,
                feelsLike: current.FeelsLikeC,
                city: city,
                main: mapWeather(current.weatherDesc[0].value)
            };

            saveAndDisplay(weatherData);
        })
        .catch(displayDefault);
}

// ==================== SAVE + CACHE ====================
function saveAndDisplay(data) {
    localStorage.setItem('momentum_weather', JSON.stringify(data));
    localStorage.setItem('momentum_weatherTime', Date.now().toString());
    displayWeather(data);
}

// ==================== MAP CONDITIONS ====================
function mapWeather(desc) {
    desc = desc.toLowerCase();

    if (desc.includes('clear') || desc.includes('sunny')) return 'Clear';
    if (desc.includes('cloud')) return 'Clouds';
    if (desc.includes('rain') || desc.includes('shower')) return 'Rain';
    if (desc.includes('drizzle')) return 'Drizzle';
    if (desc.includes('thunder')) return 'Thunderstorm';
    if (desc.includes('snow')) return 'Snow';
    if (desc.includes('mist')) return 'Mist';
    if (desc.includes('fog')) return 'Fog';
    if (desc.includes('haze')) return 'Haze';
    if (desc.includes('smoke')) return 'Smoke';

    return 'Clear';
}

// ==================== UI UPDATE ====================
function displayWeather(data) {
    const icon = weatherIcons[data.main] || '🌤️';

    document.getElementById('weatherIcon').textContent = icon;
    document.getElementById('weatherTemp').textContent = `${data.temp}°C`;
    document.getElementById('weatherCity').textContent = data.city;
    document.getElementById('weatherDesc').textContent = data.desc;

    document.getElementById('weatherHumidity').textContent = `${data.humidity}%`;
    document.getElementById('weatherWind').textContent = `${data.wind} km/h`;
    document.getElementById('weatherFeels').textContent = `${data.feelsLike}°C`;
}

// ==================== FALLBACK ====================
function displayDefault() {
    document.getElementById('weatherIcon').textContent = '🌤️';
    document.getElementById('weatherTemp').textContent = '--°C';
    document.getElementById('weatherCity').textContent = 'Unavailable';
    document.getElementById('weatherDesc').textContent = 'Weather unavailable';
}