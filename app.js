const ejsMate = require('ejs-mate');
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const ErrorHandle = require('./utils/ErrorHandle');
const Joi = require('joi');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const path = require('path');
const app = express();

// Models

const { log } = require('console');

// schema



mongoose.connect('mongodb://127.0.0.1/bestpoints')
.then((result)=>{
    console.log('connected to mongoose');
}).catch((err)=>{
    console.log(err);
});

// iniciete ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'this-is-a-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});




       



app.get('/', (req, res) => {
  res.render('home');
})

app.use('/places', require('./routes/places'));
app.use('/places/:place_id/reviews', require('./routes/reviews'));





app.all('*', (req, res, next) => {
  next(new ErrorHandle('Page Note Found', 404));
});

// error handler
app.use((err, req, res, next) => {
  const {statusCode = 500} = err;
  if(!err.message) err.message = 'Oh no, Something Went Wrong';
  res.status(statusCode).render('error', {err});
});

app.listen(8080, () => {
  console.log(`server is running on http://127.0.0.1:8080`)
})