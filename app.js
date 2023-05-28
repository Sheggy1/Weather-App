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
            console.log(temp)

            const feelsLike = weatherData.weather[0].description;
            console.log(feelsLike)

        })

    })
    
    res.send("")
})



app.listen(3000, function() {
    console.log("Server is running")
});