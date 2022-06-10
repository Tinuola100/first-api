const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const https = require("https");
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res) {
    const country = req.body.country

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=22595924d403734e3a3749865d524c4a`

    https.get(url, (response) => {
        console.log(response.statusCode)
        response.on("data", (data) => {
        const weatherData= JSON.parse(data)
        const temp = weatherData.main.temp
        const desc = weatherData.weather[0].description
        const ic = weatherData.weather[0].icon;
        const icons =`https://openweathermap.org/img/wn/${ic}@4x.png`;
        res.write(`<p>The Weather in ${country} is: ${desc}</p>`);
        res.write(`<h1>The Temperature in ${country} is: ${temp} degree celcius</h1>`);
        res.write(`<img src=${icons} alt="weather icon">`);
        res.write(`<button onclick="history.back()">Return home</button>`);
        res.send()

    })
});
})

https

app.listen(3001, (request, response)=>{
    console.log(`server running on: ${3001}`);
});