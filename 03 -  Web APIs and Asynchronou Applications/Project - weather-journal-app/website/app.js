/* Import Dependencies */
// const fetch = require("node-fetch");

/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/forecast"
const weatherAPIKey = "8dff14203378c3b7ee6e95b2ff6fc043";
const backendURL = "http://localhost:3000"


/* Helper Functions */
const retrieveWeatherData = async (url, zipCode, apiKey) =>{ 
    const queryURL = `${url}?zip=${zipCode}&appid=${apiKey}`;
    // console.log(queryURL);
    const request = await fetch(queryURL);
    
    // Retrieve weather data from OpenWeather
    const weatherData = await request.json();
    const temp = weatherData.list[0].main.temp;
    return temp;

};

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const status = await response.status;
    if (status !== 200){
        throw "Server Failure!";
    }
};

const updateUI = async () => {
    const response = await fetch(`${backendURL}/getRecentData`);
    try{
        const userData = await response.json();
        document.getElementById('date').innerHTML    = `Date: ${userData.date}`;
        document.getElementById('temp').innerHTML    = `Temperature: ${userData.temp}`;
        document.getElementById('content').innerHTML = `Your Feeling: ${userData.userFeeling}`;
    }catch(error){
        console.log("error", error);
    }
};


/* Event Listener */
document.getElementById("generate").addEventListener('click', function(){
    // Get date
    let d = new Date();
    const newDate = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
    
    // Get User Feeling
    const userFeeling = document.getElementById("feelings").value;
    
    // Get ZipCode
    const zipCode = document.getElementById("zip").value;
    // console.log(`Zip code: ${zipCode}`);
    
    // Get weather data
    retrieveWeatherData(baseURL, zipCode, weatherAPIKey)
    .then(function(temp){
        // console.log(`Temp: ${temp}`);
        // console.log(`Date: ${newDate}`);
        // console.log(`User Feeling: ${userFeeling}`);
        // Send all gathered info to the backend
        postData(`${backendURL}/saveUserData`,
            {
                "temperature": temp,
                "date": newDate,
                "user_feeling": userFeeling
            }
        )
        .then(()=>{
            updateUI();
        })
        .catch(function(error){
            console.log("error", error);
            alert("Backend Server has a problem!");

        });
    })
    .catch(function(error){
        console.log("error", error);
        alert("Posted ZipCode wasn't found!!");
    });
});