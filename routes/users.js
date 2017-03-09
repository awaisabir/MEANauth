const express = require("express");
const router = express.Router();


// Register
router.get('/register', (req, res, next) => {

	res.send('Register Route');
});

// Authenticate
router.post('/authenticate', (req, res, next) => {

	res.send('Authenticate Route');
});

// Profile
router.get('/profile', (req, res, next) => {

	res.send('Profile Route');
});

// Validate
router.get('/validate', (req, res, next) => {

	res.send('Validate Route');
});

// Other Routes
router.get('*', (req, res, next) => {

	res.send('404');
});


// Export
module.exports = router;