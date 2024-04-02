import domReady from '@roots/sage/client/dom-ready';

// Variáveis globais
const apiKey = 'd9ccca83e50b3b83bf9c7e408990ca7a';
let debounceTimeout;
let autoCompleteResults;

domReady(() => {
  autoCompleteResults = document.getElementById('autocomplete-results');

   // Adiciona evento de input para buscar sugestões de cidades com debounce.
  document.querySelector('.growing-search .input input').addEventListener('input', function(e) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const query = e.target.value;
      if (query.length > 0) {
        fetchCitySuggestions(query);
      } else {
        autoCompleteResults.innerHTML = '';
      }
    }, 300);
  });

  // Verifica se a geolocalização está disponível e, caso esteja, obtém os dados meteorológicos.
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(fetchWeatherData, handleLocationError);
  } else {
    updateWeatherDisplay('Geolocalização não suportada neste navegador.', {}, 'error');
  }
});

// Função para buscar dados meteorológicos com base na localização atual.
function fetchWeatherData(position) {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric&lang=pt_br`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

  updateWeatherFromApi(currentUrl, forecastUrl);
}

// Função para buscar dados meteorológicos com base em uma cidade específica.
function fetchWeatherDataByCity(city) {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  updateWeatherFromApi(currentUrl, forecastUrl);
}

// Função para atualizar a interface com os dados meteorológicos obtidos.
function updateWeatherFromApi(currentUrl, forecastUrl) {
  Promise.all([
    fetch(currentUrl).then(response => response.json()),
    fetch(forecastUrl).then(response => response.json()),
  ]).then(([currentData, forecastData]) => {
    updateWeatherDisplay('', currentData, 'current');
    updateForecastDisplay(forecastData);
  }).catch(error => {
    console.error('Erro ao buscar dados da API', error);
    updateWeatherDisplay('Erro ao obter dados da previsão do tempo.', {}, 'error');
  });
}

// Função para buscar sugestões de cidades baseadas na entrada do usuário.
async function fetchCitySuggestions(query) {
  const apiUrl = `wp-content/themes/WeatherVersion/proxy.php?query=${query}`;
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
      }
      const data = await response.json();
      displayCitySuggestions(data.data);
  } catch (err) {
      console.error('Erro ao buscar sugestões de cidades:', err);
      autoCompleteResults.innerHTML = 'Erro ao buscar sugestões.';
  }
}

// Função para exibir as sugestões de cidades na interface.
function displayCitySuggestions(cities) {
  autoCompleteResults.innerHTML = '';
  cities.forEach(city => {
    let div = document.createElement('div');
    div.className = 'p-2 hover:bg-blue-700 cursor-pointer text-white';
    div.textContent = `${city.name}, ${city.countryCode}`;
    div.onclick = function() {
      document.getElementById('city-input').value = city.name;
      autoCompleteResults.innerHTML = '';
      fetchWeatherDataByCity(city.name);
    };
    autoCompleteResults.appendChild(div);
  });
}

// Função para tratar erros de geolocalização.
function handleLocationError(error) {
  console.error('Erro ao obter localização', error);
  updateWeatherDisplay('Não foi possível obter a localização.', {}, 'error');
}

// Função para atualizar os elementos de interface com os dados meteorológicos.
function updateWeatherDisplay(message, data, type = 'success') {
  const locationElement = document.getElementById('location');
  const descriptionTextElement = document.getElementById('description').querySelector('span');
  const tempElement = document.getElementById('temp');
  const humidityTextElement = document.getElementById('humidity');
  const windTextElement = document.getElementById('wind');
  const pressureTextElement = document.getElementById('pressure');
  const datetimeElement = document.getElementById('current-datetime');

  if (type === 'error') {
    locationElement.innerText = message;
    descriptionTextElement.innerText = message;
  } else {
    const iconClass = getWeatherIconClass(data.weather[0].icon);
    const weatherIconElement = document.getElementById('weather-icon');
    weatherIconElement.className = iconClass;
    locationElement.innerText = `${data.name}, ${data.sys.country}`;
    descriptionTextElement.innerText = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    tempElement.innerText = `${Math.round(data.main.temp)}°C`;
    humidityTextElement.innerText = `Umidade: ${data.main.humidity}%`;
    windTextElement.innerText = `Vento: ${Math.round(data.wind.speed * 3.6)} km/h`;
    pressureTextElement.innerText = `Pressão: ${data.main.pressure} hPa`;

    const updateDate = new Date(data.dt * 1000);
    datetimeElement.innerText = `Atualizado pela última vez em: ${updateDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`;
  }
}

// Função para atualizar a interface com a previsão do tempo.
function updateForecastDisplay(data) {
  const forecastElement = document.getElementById('forecast');
  forecastElement.innerHTML = '';
  
  data.list.forEach((item, index) => {
    if (index % 8 === 0) {
      const iconClass = getWeatherIconClass(item.weather[0].icon);
      const weatherDescription = item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1);
      
      forecastElement.innerHTML += `
        <div class="p-4 bg-blue-900 bg-opacity-60 rounded-lg shadow flex flex-col items-center">
          <div class="text-sm text-center">${new Date(item.dt_txt).toLocaleDateString()}</div>
          <i class="${iconClass} text-2xl my-2"></i>
          <div class="text-lg text-center">${weatherDescription}</div>
        </div>
      `;
    }
  });
}

// Função para determinar a classe de ícone apropriada com base
function getWeatherIconClass(iconCode) {
  const iconMap = {
    '01d': 'fa-sun',
    '01n': 'fa-moon',
    '02d': 'fa-cloud-sun',
    '02n': 'fa-cloud-moon',
    '03d': 'fa-cloud',
    '03n': 'fa-cloud',
    '04d': 'fa-cloud-meatball',
    '04n': 'fa-cloud-meatball',
    '09d': 'fa-cloud-rain',
    '09n': 'fa-cloud-rain',
    '10d': 'fa-cloud-sun-rain',
    '10n': 'fa-cloud-moon-rain',
    '11d': 'fa-bolt',
    '11n': 'fa-bolt',
    '13d': 'fa-snowflake',
    '13n': 'fa-snowflake',
    '50d': 'fa-smog',
    '50n': 'fa-smog',
  };

  return `fas ${iconMap[iconCode] || 'fa-cloud'}`;
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error);
}