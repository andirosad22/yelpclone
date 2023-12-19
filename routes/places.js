
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandle = require('../utils/ErrorHandle');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuthenticated = require('../middlewares/isAuth')
// Models
const Place = require('../models/place');

// Schema
const { placeSchema } = require('../schemas/place');
const { isAuthorPlace } = require('../middlewares/isAuthor');

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

router.get('/create', isAuthenticated, (req, res) => {
  res.render('places/create');
});

router.post('/',isAuthenticated, validatePlace, wrapAsync(async(req, res, next) => {
  const place = new Place(req.body.place);
  await place.save();
  req.flash('success_msg', 'Place Added successfully');
  res.redirect('/places');
}));
router.get('/:id', isValidObjectId('/places'), wrapAsync(async (req, res) => {  
  const place = await Place.findById(req.params.id)
  .populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  })
  .populate('author');
  res.render('places/show', {place});
}));
router.get('/:id/edit',isAuthorPlace, isAuthenticated, wrapAsync(async(req, res) =>{
  const place = await Place.findById(req.params.id);
  res.render('places/edit', {place});
}));

  
router.put('/:id', isAuthenticated,isAuthorPlace, isValidObjectId('/places'), validatePlace, wrapAsync(async(req, res) => {
  await Place.findByIdAndUpdate(req.params.id, {...req.body.place});
  req.flash('success_msg', 'Place updated successfully');
  res.redirect(`/places${id}`);
}));

router.delete('/:id',isAuthorPlace, isAuthenticated, wrapAsync(async(req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Place deleted successfully');
  res.redirect('/places');
}));

module.exports= router;