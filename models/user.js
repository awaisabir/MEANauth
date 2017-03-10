const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// Schema
const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		required: true
	}
});

// User model
const User = module.exports = mongoose.model('User', UserSchema);

// Export the user's ID
module.exports.getUserById = function(id, callback) {

	User.findById(id, callback);
}

// Export the user's Username
module.exports.getUserByUsername = function(username, callback) {

	const query = {username: username};
	User.findOne(query, callback);
}

// Add a user into mongo
module.exports.addUser = function(user, callback) {

  // generate salt
  bcrypt.genSalt(10, (err, salt) => {

  	bcrypt.hash(user.password, salt, (err, hash) => {
  		if(err)
  			throw error;

  		user.password = hash;
  		user.save(callback);
  	});
  });
}