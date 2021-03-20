// file:  src/client/js/app.js
const { checkForCity } = require("./checkForCity");
let appData ={};


async function handleSubmit(event) {
    event.preventDefault()
  console.log("im here-handleSubmit-app");
    // check what text was put into the form field
    let cityText = document.getElementById("destination").value
    console.log("cityText: "+cityText);
    appData = cityText;
  //  Client.checkForName(urlText)

    Client.checkForCity(cityText);
    //console.log("urlText: "+urlText);

    await getGeonames();
    await getWeatherbit();
   //
   async function getWeatherbit() {
      console.log("weatherAppData " +appData);  // 3rd shows Berlin from cityText
      fetch('http://localhost:3030/myWEATHERBIT', {
//    fetch('http://localhost:3030/myGEONAME', {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      mode: "cors",
      headers: {
       "Content-Type": "application/json"
      }, 
  //    body: JSON.stringify({city: cityText}), 
    })
    .then(res => {
      console.log("::: Form Submitted-geo-app :::");  //4th in run
        // res.json is the Native Code being sent
        return res.json()
    })
    .then(function(data) {
        //  data here is San Francisco info returned for some reason.
      console.log("im here-weatherbit-app");  // 5th in run
      console.log("data2:");                  // 6th in run
      console.log(data);                      // 7th shows SF

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

async function getGeonames() {
    console.log("im here-geonames-app1");  // 1st in run
    console.log("appData-geo: "+appData);  // 2nd returns Berlin from cityText
      fetch('http://localhost:3030/myGEONAME', {
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
      console.log("::: Form Submitted-geonames-app2 :::");  // 8th in run
      console.log("res.json_geonames:");                    // 9th in run
      console.log(res.json);                                // 10th show Native Code sending
        return res.json()
    })
    .then(function(data) {
       console.log("im here-geonames app3");                // 11th in run 
         appData = {lat: data.geonames[0].lat};
       console.log(data.geonames[0].countryName);           // 12th showing Germany
       console.log("geoAppData"+appData);                   // 13th in run
       console.log(appData);                                // 14th in showing Latitude
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
  }; // End - getWeatherbit

}  // End - handleSubmit



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





