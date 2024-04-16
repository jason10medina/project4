const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();

const itemRouter = require('./routes/items');
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB)
  .then(() => {
    console.log('MongoDB connected...');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoDB })
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.user ? true : false;
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Move the route registration before the catch-all route
app.use('/items', itemRouter);
app.use('/', homeRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.render('index', { messages: req.flash('success') });
});

// Catch-all route for 404 errors
app.use((req, res, next) => {
  res.status(404).render('error', {
      title: '404 Not Found',
      message: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      status: 404,
      error: null 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Log the error to a file or a logging service
  console.error(err);

  res.status(err.status || 500);
  res.render('error', {
      title: 'Error',
      message: err.message || 'An unexpected error occurred',
      error: err 
  });
});