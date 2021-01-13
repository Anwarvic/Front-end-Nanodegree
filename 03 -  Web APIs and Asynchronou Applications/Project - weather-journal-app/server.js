// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{
    // console.log(server);
    console.log(`running on localhost: ${port}`);
});

// GET route
app.get('/getRecentData', function(req, res){
    console.log("Data sent!");
    res.send(projectData);
});


// POST route
app.post('/saveUserData', function(req, res){
    const data = req.body;
    // Save user data into `projectData`
    projectData.temp = data.temperature;
    projectData.date = data.date;
    projectData.userFeeling = data.user_feeling;
    // Send success message
    res.status(200).send("User Data Saved!");
});

