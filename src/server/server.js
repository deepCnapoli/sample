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

const weatherbit_Url2 = 'https://api.weatherbit.io/v2.0/forecast/daily?city=SanFrancisco,CA&key=81fca50d48c344b2b516e37233598870';

//console.log("mockAPI: "+JSON.stringify(mockAPIResponse))

// designates what port the app will listen to for incoming requests
app.listen(3030, function () {
    console.log('Example app listening on port 3030!')  // 1st run
})

// Array to store project data
let projectData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

/* app.get('/test', function (req, res) {  (from old code- to be removed)
    res.json(mockAPIResponse);
})*/

// POST the URL input to the API
app.post("/myGEONAME", async (req, res) => {
    console.log("im here-geo-server");          // 2nd run
  const geoData = req.body;                   
  projectData = geoData;
  console.log("projectData1: "+projectData);    // 3rd run
  console.log(projectData);                     // 4th showing {city: 'Berlin'}
  const bodyCITY = req.body.city;
  //const bodyURL = ("London");
  console.log(bodyCITY);                        // 5th showing Berlin
  //const resp = await fetch(`${baseUrl}${API_KEY}&txt=${bodyURL}&lang=en`);
  //const resp = await fetch(`${baseUrl}${bodyURL}${API_KEY}`);
  const testDisp = (`${geonames_Url}${bodyCITY}${geonames_KEY}`);
  console.log("testDisp: "+testDisp);           // 6th showing geonames URL search
  const resp = await fetch(`${geonames_Url}${bodyCITY}${geonames_KEY}`);
  console.log("resp_Geo: "+resp);               // 12th run
  console.log(resp);                            // 13th resp with url of geonames and status OK
  try {
    const data = await resp.json();

    console.log("geoCountryName-server: "+data.geonames[0].countryName);  // 14th showing Germany
    const geoCountryName = data.geonames[0].countryName;
    const geoLat = data.geonames[0].lat;
    const geoLong = data.geonames[0].lng;
    console.log("geoCountryName: "+geoCountryName);  // 15th country Germany
    console.log("geoLat: "+geoLat);                  // 16th Lat 52.5
    console.log("geoLong: "+geoLong);                // 17th Long 13.4 

    projectData['long'] = data.geonames[0].lng;
    projectData['lat'] = data.geonames[0].lat;

    console.log("geoProjectData: ",projectData);     // 18th  { city: 'Berlin', long: '13.41053', lat: '52.52437' }


    res.send(data);
  } catch (err) {
    console.log("error", err);
  }
}); // End - app.post(myGEONAME)

// POST the URL input to the API
app.post("/myWEATHERBIT", async (req, res) => {
    console.log("weatherProjectData: ",projectData); // 7th run showing  { city: 'Berlin' }
  const wLong = projectData.long;
  const wLat = projectData.lat;
  console.log("im here-weatherbit-server");     // 8th run
  console.log("wLong: "+wLong);                 // 9th wLong undefined
  console.log("wLat: "+wLat);                   // 10th wLat undefined
  const bodyWEATHER = req.body;
  //const bodyURL = ("London");
//   console.log("bodyWEATHER:");
//  console.log(bodyWEATHER);
  const wBit_URL = (`${weatherbit_Url}&lat=${wLat}&lon={wLong}${weatherbit_KEY}`);
  console.log("wBitURL: "+wBit_URL);            // 11th wBit URL displayed
  const resp = await fetch(`${weatherbit_Url2}`);
 // const resp = await fetch(`${weatherbit_Url}&lat=${wLat}&lon={wLong}${weatherbit_KEY}`);
 // const resp = await fetch(`${geonames_Url}${bodyCITY}${geonames_KEY}`);
  console.log("resp-weath: "+resp);            // 19th run
  console.log(resp);                           // 20th resp is weathbit URL and status OK 
  try {
    const weatherData = await resp.json(); 
    console.log("weatherData: "+weatherData);  //  20th run  
    console.log("weatherHighTemp: "+weatherData.data[0].high_temp);  // 21st high_temp 11.3
    console.log("weatherDesc: "+weatherData.data[0].weather.description); // 22nd Few clouds

   // console.log(Object.values(weatherData));
    
   /* projectData['Icon'] = weatherData[0].data.weather.icon;
    projectData['description'] = weatherData[0].data.weather.description;
    projectData['temp'] = weatherData[0].data.weather.temp;

    console.log("wProjectData: ",projectData);*/

    res.send(weatherData);
  } catch (err) {
    console.log("error", err);
  }
});

// ==========
