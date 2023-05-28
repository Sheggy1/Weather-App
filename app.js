const express = require("express");
const https = require("https");

const app  = express();

app.get("/", function(req, res) {
    
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=50.45&lon=30.52&appid=9f7c426a57e60d6ed4bde7c99638316f&units=metric#";
    
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const feelsLike = weatherData.weather[0].description;
            const image = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+ image +"@2x.png";
            
            res.write("<h1>The temperature in Kyiv is " + temp + " degrees Celsius</h1>" );
            res.write( "<p>The weather style currently " + feelsLike + "<p>");
            res.write("<img src =" + imageUrl + ">");
            res.send();
        })

    })
})



app.listen(3000, function() {
    console.log("Server is running")
});