const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Route to display the registration form
router.get('/newUser', usersController.new);

// Route to handle the registration form submission
router.post('/register', usersController.register);

// Route to display the login form
router.get('/login', usersController.getUserLogin);

// Route to handle the login form submission
router.post('/login', usersController.login);

// Route to display the user's profile
router.get('/profile', usersController.profile);

// Route to handle user logout
router.get('/logout', usersController.logout);

module.exports = router;
