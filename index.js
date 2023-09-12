const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }

  window.addEventListener("keypress", (e)=>{
    let key = e.key;

    if(key == 'Enter'){
      window.location = "./index.html#weather-display";
    }
    
  })
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  if(weather.weather[0].main == "Rain"){
    changeBackground("Rain");
  }else if(weather.weather[0].main == "Clouds"){
    changeBackground("Clouds");
  }
  else if(weather.weather[0].main == "Clear"){
    changeBackground("Clear");
  }
  else if(weather.weather[0].main == "Thunderstorm"){
    changeBackground("Thunderstorm");
  }

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function changeBackground(weather_state){

   if(weather_state == "Rain"){
   var element = document.getElementById("weather-display")
   element.style.backgroundImage = 'url("./harshit-sharma-weRtrhhTz4s-unsplash.jpg")'
   document.getElementById("statement").innerHTML="It's raining at the moment, take precautions outside";
    }else if(weather_state == "Clouds"){
   var element = document.getElementById("weather-display")
   element.style.backgroundImage = 'url("./tengyart-fq6L_4_z3sA-unsplash.jpg")'
   document.getElementById("statement").innerHTML="Cloudy sky, a favourable weather condition";
   }
   else if(weather_state == "Clear"){
   var element = document.getElementById("weather-display")
   element.style.backgroundImage = 'url("./henry-co--qGKIX1Vxtk-unsplash.jpg")'
   document.getElementById("statement").innerHTML="Clear sky, anticipate a sunny day";
   }
   else if(weather_state == "Thunderstorm"){
   var element = document.getElementById("weather-display")
   element.style.backgroundImage = 'url("./paul-zoetemeijer-AtxeOe04PQ8-unsplash.jpg")'
   document.getElementById("statement").innerHTML="Thunderstorm and lightning, you can as well staying indoors";
   }
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
