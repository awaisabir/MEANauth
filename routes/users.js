const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');


// Register
router.post('/register', (req, res, next) => {

	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {

		if(err)
			res.json({success: false, message: "Failed to register user"});
		else {

			res.json({success: true, message: "User registerd"});	
		}
	});

});

// Authenticate
router.post('/authenticate', (req, res, next) => {

	res.send('Authenticate Route');
});

// Profile
router.get('/profile', (req, res, next) => {

	res.send('Profile Route');
});

// Other Routes
router.get('*', (req, res, next) => {

	res.send('404');
});


// Export
module.exports = router;