const WEATHER_API_KEY = '1bb1ccee4e5f161a54628f44d54695d9';
let CITY = 'aspen';
const UNITS = 'metric';

// Function to map weather condition to icon
const mapwWeatherConditionToIcon = weatherCondition => {
    switch (weatherCondition) {
        case '11d':
            return '021-storm-1.svg';

        case '09d':
            return '037-umbrella.svg';

        case '10d':
            return '012-rain-2.svg';

        case '13d':
            return '042-snow.svg';

        case '50d':
            return '024-windy-1.svg';

        case '01d' : case '01n' :
            return '019-rainbow-2.svg';

        case '02d' : case '02n' : case '03d' : case '03n' : case '04d' : case '04n':
            return '043-cloudy.svg';
    }

};


const mapWeatherConditionToGradient = weatherCondition => {
    const customOverview = document.getElementById('customOverview');

    switch (weatherCondition) {
        case '11d':
            customOverview.style.backgroundImage = 'linear-gradient( 135deg, #6B73FF 10%, #000DFF 100%)';
            break;

        case '09d':
            customOverview.style.backgroundImage = 'linear-gradient( 135deg, #C2FFD8 10%, #465EFB 100%)';
            break;

        case '10d':
            customOverview.style.backgroundImage = 'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)';
            break;

        case '13d':
            customOverview.style.backgroundImage = 'linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%)';
            break;

        case '50d':
            customOverview.style.backgroundImage = 'linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)';
            break;

        case '01d' : case '01n' :
            customOverview.style.backgroundImage = 'linear-gradient( 135deg, #FFE985 10%, #FA742B 100%)';
            break;

        case '02d' : case '02n' : case '03d' : case '03n' : case '04d' : case '04n':
            customOverview.style.backgroundImage = 'linear-gradient( 135deg, #97ABFF 10%, #123597 100%)';
            break;
    }
};


console.log('Fetching the weather');

// Getting Elements from the DOM
const city = document.getElementById('city');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const weatherSummary = document.getElementById('weatherSummary');
const weatherSummaryIcon = document.getElementById('weatherSummaryIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const minTemperature = document.getElementById('minTemperature');
const maxTemperature = document.getElementById('maxTemperature');


city.addEventListener('change', event => {
    CITY = event.target.value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&APPID=${WEATHER_API_KEY}`)
        .then(response => {
            response.json().then(output => {
                console.log(output);

                //Setting temperature from output
                temp.innerHTML = Math.floor(output.main.temp) + '&degC';

                //Setting city from output
                city.value = output.name;

                //Setting country from output
                country.innerText = output.sys.country;

                //Setting weather summary and icon from output
                weatherSummary.innerText = output.weather[0].description.charAt(0).toUpperCase() + output.weather[0].description.slice(1);
                weatherSummaryIcon.src = `assets/img/weather-icons/${mapwWeatherConditionToIcon(output.weather[0].icon)}`;
                mapWeatherConditionToGradient(output.weather[0].icon);

                //Setting humidity
                humidity.innerText = output.main.humidity + '%';

                //Setting wind speed
                windSpeed.innerText = output.wind.speed + 'km/h';

                //Setting min temperature
                minTemperature.innerHTML = output.main.temp_min + '&degC';

                //Setting max temperature
                maxTemperature.innerHTML = output.main.temp_max + '&degC';

            })
        })
        .catch(err => {
            console.error(err);
            alert('Ooops an error occurred');
        });
});
