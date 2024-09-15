// function getWeather(){
//     const apiKey =' 5fe36b192ffd1c36dffb6752bc1722b2'
//     const city = document.getElementById('city').value;

//     if(!city){
//         alert("Please Enter a City")
//         return;
//     }
//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
//     fetch(currentWeatherUrl)
//     .then(response=>response.json())
//     .then(data=>{
//         displayWeather(data)
//     })
//     .catch(error=>{
//         console.log('Error fetching current weather data:', error);
//         alert('Error fetching current weather data.please try again')

        
//     });
//     fetch(forecastUrl)
//         .then(response=> response.json())
//         .then(data=>{
//             displayHourlyForecast(data.list);
//         })
//         .catch(error=>{
//             console.log('Error fetching hourly forecast data:',error);
//             alert('Error fetching hourly forecast data. please try again')
            
//     });

//     }
//     function displayWeather(data){
//         if(data.cod=='404'){
//             weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
//         } else{
//             const cityName = data.name;
//             const temperature = Math.round(data.main.temp - 273.15);
//             const description = data.weather[0].description;
//             const iconCode = data.weather[0].icon;
//             const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

//             const temperatureHTML = `
//             <p>${temperature}</p>
//             `;
//             const weatherHTML = `
//             <p>${cityName}</p>
//             <p>${description}</p>
//             `;
//             tempDivInfo.innerHTML = temperatureHTML;
//             weatherInfoDiv.innerHTML = weatherHTML;
//             weatherIcon.src = iconUrl;
//             weatherIcon.alt = description;

//             showImage();

//         }

//     }
//     function displayHourlyForecast(hourlyData){
//         const hourlyForecastDiv = document.getElementById('hourly-forecast');
//         const next24Hours = hourlyData.slice(0,8);

//         next24Hours.forEach(item => {
//             const dateTime = new Data(item.dt * 1000);
//             const hour = dateTime.getHours();
//             const temperature =  Math.round(item.main.temp - 273.15);
//             const iconCode = item.weather[0].icon;
//             const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

//             const hourlyItemHtml = `
//             <div class="hourly-item">
//             <span>${hour}:00</span>
//             <img src="${iconUrl}" alt="Hourly Weather icon">
//             <span>${temperature}</span>
//             </div>
//             `;
//             hourlyForecastDiv.innerHTML +=hourlyItemHtml;
            
//         });
//     }
//     function showImage(){
//         const weatherIcon = document.getElementById('weather-icon');
//         weatherIcon.style.display = 'block';
//     }


function getWeather() {
    const apiKey = '9f09ddf548185b249726eab47adeb583'; // Replace with your actual API key
    const city = document.getElementById('city').value;

    if (!city) {
        alert("Please Enter a City");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // Fetch hourly forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.list) {
                displayHourlyForecast(data.list);
            } else {
                alert('No forecast data available');
            }
        })
        .catch(error => {
            console.log('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const tempDivInfo = document.getElementById('temp-info');
    const weatherIcon = document.getElementById('weather-icon');

    if (data.cod === 404) {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = ''; // Clear previous data

    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
