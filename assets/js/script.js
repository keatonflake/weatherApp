const cityNameInputEl = document.querySelector('#cityNameInput');
const formClassEl = document.querySelector('#formClass');

// Current weather Items grab-a-nabber
const humidityEl = document.querySelector('#humidity');
const tempEl = document.querySelector('#temp');
const windSpeedEl = document.querySelector('#windSpeed');
const uviEl = document.querySelector('#uvi');

const dateAndTimeEl = document.querySelector('#dateAndTime');

// user weather search
var formSubmitHandler = function(event) {

    event.preventDefault();
    
    let cityName = cityNameInputEl.value.trim();

    if (cityName) {
        getWeatherData(cityName)
        console.log(cityName)
    }
}

// grabbing lat and lon of user selected city
function getWeatherData (cityname) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=fb0edd857bab8092d150bbc076d9150a";
    fetch(apiUrl)
        .then(response => response.json()).then(data => {
           
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            console.log(lat)
            getweatherinbulk(lat, lon)   
    })
}

// api that has current and future forecast
function getweatherinbulk(lat, lon) {
    var bulk_api = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&units=imperial&appid=' + "de861e054e6f057842ce7c95b3ab5215";
    fetch(bulk_api).then(response => response.json()).then(data => {
        console.log(data);

         let tempString = JSON.stringify(data.current.temp) + '°F';
         let humidityString = JSON.stringify(data.current.humidity) + '%';
         let windSpeedString = JSON.stringify(data.current.wind_speed) + 'mph'
         let uviString = JSON.stringify(data.current.uvi)

        let timeZone = JSON.stringify(data.timezone)

        humidityEl.innerHTML = humidityString
        tempEl.innerHTML = tempString
        windSpeedEl.innerHTML = windSpeedString
        uviEl.innerHTML = uviString

        let timeZoneValue = Intl.DateTimeFormat().resolvedOptions().timeZone;

        let options = {
            timeZone: timeZoneValue,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
             },
          formatter = new Intl.DateTimeFormat([], options);
        
        dateAndTimeEl.innerHTML = (formatter.format(new Date()));
    })
}


formClassEl.addEventListener("click", formSubmitHandler)