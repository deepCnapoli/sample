// file:  src/client/js/app.js
const { checkForCity } = require("./checkForCity");
let appData ={};


async function handleSubmit(event) {
    event.preventDefault()
  console.log("im here-handleSubmit-app");  // 1st run 
    // check what text was put into the form field
    let cityText = document.getElementById("destination").value
    console.log("cityText: "+cityText);     // 2nd shows cityText: Berlin
    appData = cityText;
  //  Client.checkForName(urlText)

    Client.checkForCity(cityText);
    //console.log("urlText: "+urlText);

    await getGeonames();
    await getWeatherbit();
    await getPixabay();
   //
 }  // End - handleSubmit  Monday try

 async function getGeonames() {
  console.log("im here-geonames-app1");  // 3rd in run
  console.log("appData-geo: "+appData);  // 4th returns Berlin from cityText
    await fetch('http://localhost:3030/myGEONAME', {
   //   fetch('http://localhost:3030/myWEATHERBIT', {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      mode: "cors",
      headers: {
       "Content-Type": "application/json"
      },
   body: JSON.stringify({city: appData}),   
    })
    .then(res => {
      console.log("::: Form Submitted-geonames-app2 :::");  // 6th in run
      console.log("res.json_geonames:");                    // 7th in run
      console.log(res.json);                                // 8th show Native Code sending
        return res.json()
    })
    .then(function(data) {
       console.log("im here-geonames app3");                // 9th in run 
         appData = {lat: data.geonames[0].lat, long: data.geonames[0].lng};
       console.log(data.geonames[0].countryName);           // 10th showing Germany
       console.log("geoAppData"+appData);                   // 11th in run
       console.log(appData);                                // 12th in showing Latitude
  //     console.log(data);
     //  document.getElementById('results').innerHTML = data.message 
 //   document.getElementById('results').innerHTML = data.geonames[0].countryName;
        //console.log(data);
    // new code for subjectivity translate
 //   results.innerHTML = "Subjectivity of the text: " + subjectScore(data.geonames[0].countryName);
 //   console.log(results.innerHTML);
    })
    .catch(err => {
      console.log(err);
    })
  }; // End - getGeonames

   async function getWeatherbit() {
      console.log("weatherAppData1 " +appData);  // 5th shows Berlin from cityText
      console.log(appData); 
      const lat = appData.lat;
      const long = appData.long;

      fetch('http://localhost:3030/myWEATHERBIT', {
//    fetch('http://localhost:3030/myGEONAME', {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      mode: "cors",
      headers: {
       "Content-Type": "application/json"
      },  
    body: JSON.stringify(appData), 
    })
    .then(res => {
      console.log("::: Form Submitted-weatherbit-app :::");  //13th in run
        // res.json is the Native Code being sent
        return res.json()
    })
    .then(function(data) {
        //  data here is San Francisco info returned for some reason.
      console.log("im here-weatherbit-app");  // 14th in run
      console.log("data2:");                  // 15th in run
      console.log(data);                      // 16th shows SF

     //  document.getElementById('results').innerHTML = data.message 
   //1  document.getElementById('results').innerHTML = data.geonames[0].countryName;

     
  // console.log("geoCountryName: "+data.geonames[0].countryName);
  // console.log(data);

    // new code for subjectivity translate
 //   results.innerHTML = "Subjectivity of the text: " + subjectScore(data.geonames[0].countryName);
 //  console.log("resultsGeoname: "+results.innerHTML);
    })
    .catch(err => {
      console.log(err);
    })
   } // End - getWeatherbit 

   async function getPixabay() {
      console.log("pixabayAppData1 " +appData);  // 5th shows Berlin from cityText
      console.log(appData); 
     /* const lat = appData.lat;
      const long = appData.long;*/

      fetch('http://localhost:3030/myPIXABAY', {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      mode: "cors",
      headers: {
       "Content-Type": "application/json"
      }  
   // body: JSON.stringify(appData), 
    })
    .then(res => {
      console.log("::: Form Submitted-pixabay-app :::");  //13th in run
        // res.json is the Native Code being sent
        return res.json()
    })
    .then(function(data) {
      console.log("im here-pixabay-app");  
      console.log("data_pix:");                  
      console.log(data);                     

      document.getElementById('results').innerHTML = data.hits[0].webformatURL; 
   //1  document.getElementById('results').innerHTML = data.geonames[0].countryName;

     
  // console.log("geoCountryName: "+data.geonames[0].countryName);
  // console.log(data);

    // new code for subjectivity translate
 //   results.innerHTML = "Subjectivity of the text: " + subjectScore(data.geonames[0].countryName);
 //  console.log("resultsGeoname: "+results.innerHTML);
    })
    .catch(err => {
      console.log(err);
    })
   } // End - getPixabay 

//Function to translate subjectivity score
function subjectScore(text) {
let textScore;
console.log("text: "+text);
switch (text) {
  case "United Kingdom":
    textScore = "United Kingdom is the country.";
    break;
  case "Germany":
    textScore = "Germany is the country.";
    break;
  default:
    textScore = "No subjectivity provided";
} // end: switch
  return textScore;
}; // end: function subjectScore


export { handleSubmit }





