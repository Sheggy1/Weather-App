const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app  = express();

app.use(bodyParser.urlencoded({extented : true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = ""; // API key need to be added i've delete it cause someone can use it :)
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const feelsLike = weatherData.weather[0].description;
            const image = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+ image +"@2x.png";

            res.write("<h1>The temperature in "+ query + " is " + temp + " degrees Celsius</h1>" );
            res.write( "<p>The weather style currently " + feelsLike + "<p>");
            res.write("<img src =" + imageUrl + ">");
            res.send();
        })

    })
})

app.listen(3000, function() {
    console.log("Server is running")
});