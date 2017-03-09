// Entry point file
let express = require("express");
let path = require("path");
let bodyparser = require("body-parser");
let cors = require("cors");
let passport = require("passport");
let mongoose = require("mongoose");


let app = express();

let PORT = 3000;

app.get('/', (req, res) => {

	res.send('On the / route');
});

app.listen(PORT, () => {

	console.log("Server listening on port : " + PORT);
});