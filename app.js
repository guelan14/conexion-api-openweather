const express = require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({enconded: true}));



app.get("/",function (req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey="";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+",%20AR&APPID="+apiKey;

    https.get(url,function(response){
            response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp=weatherData.main.temp-273;
            const weatherDescription=weatherData.weather[0].description;
            res.send("The temperature in Posadas is "+temp+" Grados");
            });
        });
    });


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})