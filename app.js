// Valid requires
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(config.database);

mongoose.connection.on('error', () => {

	console.log("error " + config.database);
})

mongoose.connection.on('connected', () => {

	console.log("Connected to db " + config.database);
})

// Initializing express
const app = express();

const users = require('./routes/users');

// Middleware
app.use(cors());
app.use(bodyparser.json());
app.use('/users', users);
// static folder
app.use(express.static(path.join(__dirname, 'public')));

// Port
const PORT = 3000;

// handle for '/' route
app.get('/', (req, res) => {

	res.send('Invalid Route');
});

app.get('*', (req, res) => {

	res.send('404');
});


// Startup server
app.listen(PORT, () => {

	console.log("Server listening on port : " + PORT);
});