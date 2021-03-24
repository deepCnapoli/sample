var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
// to use json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

// to use url encoded values
app.use(express.static('dist'));

//Credentials for API
const geonames_Url = "http://api.geonames.org/searchJSON?&q=";
const geonames_KEY = process.env.GEO_API_KEY;

const weatherbit_Url = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherbit_KEY = "&key=81fca50d48c344b2b516e37233598870";

const pixabay_Url = 'https://pixabay.com/api/?&image_type=photo&orientation=horizontal&safesearch=true&per_page=10';
const pixabay_KEY = "&key=20583815-92a5d804b2156027707082fd6";

// designates what port the app will listen to for incoming requests
app.listen(3030, function () {
    console.log('Example app listening on port 3030!')  // 1st run
})

// Array to store project data
let projectData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// POST the URL input to the API
app.post("/myGEONAME", async (req, res) => {
    console.log("im here-geo-server");          
  const geoData = req.body;                   
  projectData = geoData;
  console.log("projectData1: "+projectData);    
  console.log(projectData);                     
  const bodyCITY = req.body.city;
  //const bodyURL = ("London");
  console.log(bodyCITY);                        

  const testDisp = (`${geonames_Url}${bodyCITY}${geonames_KEY}`);
  console.log("testDisp: "+testDisp);           
  const resp = await fetch(`${geonames_Url}${bodyCITY}${geonames_KEY}`);
  console.log("resp_Geo: "+resp);               
  console.log(resp);                            
  try {
    const data = await resp.json();

    console.log("geoCountryName-server: "+data.geonames[0].countryName);
    const geoCountryName = data.geonames[0].countryName;
    const geoLat = data.geonames[0].lat;
    const geoLong = data.geonames[0].lng;
    console.log("geoCountryName: "+geoCountryName);  
    console.log("geoLat: "+geoLat);                  
    console.log("geoLong: "+geoLong);                

    projectData['long'] = data.geonames[0].lng;
    projectData['lat'] = data.geonames[0].lat;

    console.log("geoProjectData: ",projectData);     


    res.send(data);
  } catch (err) {
    console.log("error", err);
  }
}); // End - app.post(myGEONAME)

// POST the URL input to the API
app.post("/myWEATHERBIT", async (req, res) => {
    console.log("weatherProjectData-Mon: ",projectData); 
  const wLong = projectData.long;
  const wLat = projectData.lat;
  console.log("im here-weatherbit-server");     
  console.log("wLong: "+wLong);                 
  console.log("wLat: "+wLat);                   
  const bodyWEATHER = req.body;
  const wBit_URL = (`${weatherbit_Url}&lat=${wLat}&lon=${wLong}${weatherbit_KEY}`);
  console.log("wBitURL: "+wBit_URL);            
  const resp = await fetch(`${wBit_URL}`);
  console.log("resp-weath: "+resp);            
  console.log(resp);                           
  try {
    const weatherData = await resp.json(); 
      console.log("weatherData: "+weatherData);   
      console.log("weatherHighTemp: "+weatherData.data[0].high_temp);  
      console.log("weatherDesc: "+weatherData.data[0].weather.description); 
    res.send(weatherData);
  } catch (err) {
    console.log("error", err);
  }
}); // End - app.post(myWEATHERBIT)

// POST the URL input to the PIXABAY API
app.post("/myPIXABAY", async (req, res) => {
    console.log("pixabayData1: ",projectData); 
    const pCity = projectData.city;
    console.log("pCity: "+pCity);                 
  const bodyWEATHER = req.body;

  const pIXABAY_URL = (`${pixabay_Url}${pixabay_KEY}&q=${pCity}`);
  console.log("pIXURL: "+pIXABAY_URL);    
  const resp = await fetch(`${pIXABAY_URL}`);
  console.log("resp-pixABAY: "+resp);           
  console.log(resp);                          
  try {
    const pixabayData = await resp.json(); 
    projectData['img1'] = pixabayData.hits[0].webformatURL;
    projectData['img2'] = pixabayData.hits[1].webformatURL; 
    console.log("pixabayData2: ",projectData); 
    res.send(pixabayData);
  } catch (err) {
    console.log("error", err);
  }
}); // End - app.post(myPIXABAY)

