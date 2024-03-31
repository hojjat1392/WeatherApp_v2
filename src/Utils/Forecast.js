const request = require("request");

const forecast = (lat, lon, callback) => {
  const forecastUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    encodeURIComponent(lat) +
    "&lon=" +
    encodeURIComponent(lon) +
    "&appid=3db603f4461ea7190804a28ea42deef4&units=metric";

  request({ url: forecastUrl, json: true }, (error, response) => {
    if (error) {
      callback("Check your Connection", undefined);
    } else if (response.message) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
        description: `in ${response.body.name} the wather is ${response.body.weather[0].description}. The temp is ${response.body.main.temp}, feels like ${response.body.main.feels_like} `,
        cityname: response.body.name,
        temp: response.body.main.temp,
      });
    }
  });

  
};

module.exports = forecast;
