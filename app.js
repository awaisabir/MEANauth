// Valid requires
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// connect
mongoose.connect(config.database);

// error handle
mongoose.connection.on('error', () => {

	console.log("error " + config.database);
})

// connection handle
mongoose.connection.on('connected', () => {

	console.log("Connected to db " + config.database);
})

// Initializing express
const app = express();

// require the user routes
const users = require('./routes/users');

// Middleware
app.use(cors());
app.use(bodyparser.json());
app.use('/users', users);
// static folder

app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Port
const PORT = 3000;

// handle for '/' route
app.get('/', (req, res) => {

	res.send('Invalid Route');
});


// Startup server
app.listen(PORT, () => {

	console.log("Server listening on port : " + PORT);
});