const ejsMate = require('ejs-mate');
const express = require('express');
const ErrorHandle = require('./utils/ErrorHandle');
const Joi = require('joi');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const wrapAsync = require('./utils/wrapAsync');
const path = require('path');
const app = express();

// Models
const Place = require('./models/place');
const { log } = require('console');

// schema
const { placeSchema } = require('./schemas/place');

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

const validatePlace = (req, res, next) => {
  const {error} = placeSchema.validate(req.body);
  if(error) {
    console.log(error);
    const msg = error.details.map(el => el.message).join(',');
    return next(new ErrorHandle(msg, 400));
  }else{
    next();
  }
}


app.get('/', (req, res) => {
  res.render('home');
})

app.get('/places', wrapAsync(async(req, res) => {
  const places = await Place.find();
  res.render('places/index', {places});
}));

app.get('/place/create', (req, res) => {
  res.render('places/create');
});

app.post('/places', validatePlace, wrapAsync(async(req, res, next) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect('/places');
}));
app.get('/place/:id', wrapAsync(async (req, res) => {  
  const place = await Place.findById(req.params.id);
  res.render('places/show', {place});
}));
app.get('/place/:id/edit', wrapAsync(async(req, res) =>{
  const place = await Place.findById(req.params.id);
  res.render('places/edit', {place});
}));


app.put('/place/:id', validatePlace, wrapAsync(async(req, res) => {
  await Place.findByIdAndUpdate(req.params.id, {...req.body.place});
  res.redirect('/places');
}));

app.delete('/place/:id', wrapAsync(async(req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  res.redirect('/places');
}));

app.all('*', (req, res, next) => {
  next(new ErrorHandle('Page Note Found', 404));
})

// error handler
app.use((err, req, res, next) => {
  const {statusCode = 500} = err;
  if(!err.message) err.message = 'Oh no, Something Went Wrong';
  res.status(statusCode).render('error', {err});
});

app.listen(8080, () => {
  console.log(`server is running on http://127.0.0.1:8080`)
})