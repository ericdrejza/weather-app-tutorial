window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector('.degree-section span');

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    const api_key = config.OPEN_WEATHER_KEY;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${api_key}`;
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        const { temp } = data.main;
        const weather = data.weather[0];

        var weatherDescription = weather.description;
        const weatherWords = weatherDescription.split(" ");

        for (let i = 0; i < weatherWords.length; i++) {
          weatherWords[i] = weatherWords[i][0].toUpperCase() + weatherWords[i].substr(1);
        }
        
        weatherDescription = weatherWords.join(" ");


        // Set DOM Elements from the API
        temperatureDegree.textContent = temp+String.fromCharCode(0x00B0);
        temperatureDescription.textContent = weatherDescription;
        locationTimezone.textContent = data.name;
        
        //Set Icon
        setIcons(weather, document.querySelector(".icon"));

        // Change temperature unit to Celsius/Farenheit
        // FORMULA FOR FARENHEIT -> CELSIUS
        let celsius = (temp - 32) * (5 / 9);
        temperatureSection.addEventListener("click", () => {
          if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius)+String.fromCharCode(0x00B0);
          }
          else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = temp+String.fromCharCode(0x00B0);
          }
        })
      });
    });
  }
  
  function setIcons(weather, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = setWeatherIconDescriptor(weather);
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function setWeatherIconDescriptor(weather){
    var icon = weather.icon;
    var timeOfDay;

    
    if (icon[icon.length - 1] == "d"){
      timeOfDay = "DAY";
    }
    else if (icon[icon.length - 1] == 'n'){
      timeOfDay = "NIGHT";
    }
    else {
      print("Error: setWeatherIconDescriptor(): No time of day.");
    }
    
    switch (icon.substring(0,2)) {
      case "01":
        return "CLEAR_"+timeOfDay;
      case "02":
      case "03":
        return "PARTLY_CLOUDY_"+timeOfDay;
      case "04":
        return "CLOUDY";
      case "09":
      case "10":
      case "11":
        return "RAIN";
      case "13":
        if (!weather.description.toUpperCase().localeCompare("SLEET")
            || !weather.description.toUpperCase().localeCompare("FREEZING RAIN")){
          return "SLEET";
        }
        return "SNOW";
      case "50":
        return "FOG";
      default:
        break;
    }
  }

});