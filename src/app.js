const path = require("path");

const express = require("express");
const hbs = require("hbs");
const geocode = require("./Utils/Geocode");
const forecast = require("./Utils/Forecast");

const app = express();

//Define paths for Express config
//public directory path for showing css or bootstrap files etc...
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars views and engine location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//for showing public module using static method
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather forecasts",
    name: "Hojjat rezapour",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Hojjat rezapour",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Hojjat rezapour",
  });
});

app.get("/help/*", (req, res) => {
  res.render("errorPage", {
    message: "Help article not found!",
    title: "404 page",
    name: "Hojjat rezapour",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please fill the location!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        latitude,
        longitude,
        forecast: forecastData,
      });
    });
  });
});

// app.get("/products", (req, res) => {

//   if (!req.query.search) {
//     return  res.send({
//       error : "You must to provide a search term"
//     })
//   }
//   console.log(req.query.search)

//   res.send({
//     products:[]
//   })
// });

app.get("*", (req, res) => {
  res.render("errorPage", {
    message: "Page not found!",
    title: "404 page",
    name: "Hojjat rezapour",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
