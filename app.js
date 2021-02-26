window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

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
          
          // Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = weather.description;
          locationTimezone.textContent = data.name;

          //Set Icon
          setIcons()
        });
    });    
  }
  
  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    // const currentIcon
  }

});