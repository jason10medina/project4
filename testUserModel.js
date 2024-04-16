require('dotenv').config(); // This line loads the .env file at the beginning of your script

const mongoose = require('mongoose');
const User = require('./models/user'); // Update the path to where your User model is located
const dbUrl = process.env.MONGODB_URI; // Use the environment variable from .env file

// Connect to MongoDB
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for testing'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to test user creation
async function testUserCreation() {
  try {
    // Attempt to create a user
    const user1 = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com', // Change this email to test duplicate entry
      password: 'password123'
    });
    console.log('User created:', user1);

    // Attempt to create another user with the same email
    const user2 = await User.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'johndoe@example.com', // Same email to test uniqueness
      password: 'password123'
    });
    console.log('Second user created:', user2);
  } catch (err) {
    console.error('Error creating user:', err.message);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Run the test function
testUserCreation();
