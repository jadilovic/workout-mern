const express = require('express');
const {
	userLogin,
	userSignup,
	getAllUsers,
} = require('../controllers/userController');
const route = express.Router();

// login route
route.post('/login', userLogin);

// signup route
route.post('/signup', userSignup);

// get all users
route.get('/all-users', getAllUsers);

module.exports = route;
