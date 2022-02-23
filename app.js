const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (require, respose) {
  respose.sendFile(__dirname + "/index.html");
});

app.post("/", function (require, respose) {
  
  const querry = require.body.cityName;
  const apiKey = "f3d173a87fe550bd92bfcbc9244e390f";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    querry +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  https.get(url, function (res) {
    console.log(res.statusCode);
    res.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      respose.write(
        "<h1>A TEMPERATURA EM " + querry + " E: " + temp + " GRAUS CELSIUS</h1>"
      );
      respose.write("<h3>O TEMPO EM " + querry + " E: " + weatherDescription + "</h3>");
      respose.write("<img src=" + imageURL + ">");
      respose.send();
    });
  });
});

app.listen(3000, function () {
  console.log("PORTA DO SERVIDOR 3000.");
});
