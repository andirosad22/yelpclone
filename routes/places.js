
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandle = require('../utils/ErrorHandle');
// Models
const Place = require('../models/place');

// Schema
const { placeSchema } = require('../schemas/place');

const router = express.Router();
// middleware
const validatePlace = (req, res, next) => {
  const {error} = placeSchema.validate(req.body);
  if(error) {
    console.log(error);
    const msg = error.details.map(el => el.message).join(',');
    return next(new ErrorHandle(msg, 400));
  }else{
    next();
  };
};

router.get('/', wrapAsync(async(req, res) => {
  const places = await Place.find();
  res.render('places/index', {places});
}));

router.get('/create', (req, res) => {
  res.render('places/create');
});

router.post('/', validatePlace, wrapAsync(async(req, res, next) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect('/places');
}));
router.get('/:id', wrapAsync(async (req, res) => {  
  const place = await Place.findById(req.params.id).populate('reviews');
  res.render('places/show', {place});
}));
router.get('/:id/edit', wrapAsync(async(req, res) =>{
  const place = await Place.findById(req.params.id);
  res.render('places/edit', {place});
}));

  
router.put('/:id', validatePlace, wrapAsync(async(req, res) => {
  await Place.findByIdAndUpdate(req.params.id, {...req.body.place});
  res.redirect('/places');
}));

router.delete('/:id', wrapAsync(async(req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  res.redirect('/places');
}));

module.exports= router;