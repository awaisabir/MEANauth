const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


// Register
router.post('/register', (req, res, next) => {

	// make the req = new user to POTENTIALLY ADD to the db
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});


	// Test for an already existing user
	User.findOne({username: newUser.username}, (err, user) => {

		if(err)
			throw error;

		// if the user exists then send a failure
		if(user)
			res.json({success: false, message: "User already exists"});

		// otherwise add it to the db
		else {
			User.addUser(newUser, (err, user) => {

				if(err)
					res.json({success: false, message: "Failed to register user"});
				else {
					// send a success
					res.json({success: true, message: "User registered"});	
				}
			});

		}
	});

	// User.addUser(newUser, (err, user) => {

	// 	if(err)
	// 		res.json({success: false, message: "Failed to register user"});
	// 	else {

	// 		res.json({success: true, message: "User registered"});	
	// 	}
	// });

});

// Authenticate
router.post('/authenticate', (req, res, next) => {

	// set username & pasword = the sent username & password
	const enteredUsername = req.body.username;
	const enteredPassword = req.body.password;

	// try to get the username with the sent request
	User.getUserByUsername(enteredUsername, (err, user) => {

		// error
		if(err)
			throw error;
		// if there is no user with that information
		if(!user) {

			// send JSON with message
			res.json({success: false, message: "User not found"});
		}

		// if there is a user, then compare the passwords sent over
		User.comparePassword(enteredPassword, user.password, (err, isMatch) => {

			// error handle
			if(err)
				throw error;
			// is the password a match?
			if(isMatch) {

				// assign a token which expires in 3 minutes
				const token = jwt.sign(user, config.secret, {
					expiresIn: 180
				});

				// send a json of the JWT TOKEN & user information
				res.json({
					success: true,
					token: 'JWT '+token,
					user : {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			} else {

				// Wrong password
				res.json({success: false, message: "Oops! Wrong password"});
			}
		});
	});
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

	res.json({
		user: req.user
	})
});


// Export
module.exports = router;