const bcrypt = require('bcrypt');
const User = require('../models/user');
const saltRounds = 10;  // Number of rounds for generating the salt. Adjust as needed.

// Display the registration page
exports.new = (req, res) => {
    res.render('user/newUser');  // Adjust path if needed
};

// Handle user registration
exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        
        await user.save();

        // Set the user in the session
        req.session.user = user;

        // Redirect to the user's profile
        res.redirect('/user/profile');
    } catch (err) {
        // ... (error handling code remains the same)
    }
};

// Display the login page
exports.getUserLogin = (req, res) => {
    res.render('user/login', { error: req.flash('error'), success: req.flash('success') });
};
// Handle user login
// Handle user login
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/user/login');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/user/login');
      }
  
      req.session.user = user;
      return res.redirect('/user/profile');
    } catch (err) {
      console.error(err);
      req.flash('error', 'An error occurred during login');
      return res.redirect('/user/login');
    }
  };

// Display the user's profile
// In controllers/usersController.js

exports.profile = (req, res) => {
    // Retrieve the authenticated user from the session
    const user = req.session.user;
    
    if (user) {
      // Render the profile view template with the user data
      res.render('user/profile', { user });
    } else {
      // If no user is authenticated, redirect to the login page
      res.redirect('/users/login');
    }
  };
// Handle user logout
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            req.flash('error', 'An error occurred during logout');
            return res.redirect('/users/profile');
        }
        res.redirect('/');
    });
};
