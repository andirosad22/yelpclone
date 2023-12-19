const express = require('express');
const Place = require('../models/place');
const isValidObjectId = require('../middlewares/isValidObjectId');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandle = require('../utils/ErrorHandle');
const isAuthenticated = require('../middlewares/isAuth');


const router = express.Router({mergeParams: true});
// model
const Review = require('../models/review'); 

// schema
const { reviewSchema } = require('../schemas/review');

const validateReview = (req, res, next) => {
  const {error} = reviewSchema.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ErrorHandle(msg, 400));
  }else{
    next();
  };
};  

router.post('/', isValidObjectId('/places'),  validateReview, wrapAsync(async(req, res) => {
  const {place_id} = req.params;
  const review = new Review(req.body.review);
  const place = await Place.findById(place_id);
  review.author = req.user._id;

  place.reviews.push(review);

  await review.save();
  await place.save(); 

  req.flash('success_msg', 'Review Added successfully');
  res.redirect(`/places/${place_id}`);
}));

router.delete('/:review_id', isAuthenticated, isValidObjectId('/places'), wrapAsync(async(req, res) => {
  const {place_id, review_id} = req.params;
  await Place.findByIdAndUpdate(req.params.place_id, {$pull: {reviews: {_id: req.params.review_id}}});
  await Review.findByIdAndDelete(review_id)
  req.flash('success_msg', 'Place deleted successfully');
  res.redirect(`/places/${place_id}`);
}));

router.delete('/:review_id',isAuthenticated, isValidObjectId('/places'), wrapAsync(async (req, res) => {
  const {place_id, review_id} = req.params;
  await Place.findByIdAndUpdate(place_id, {$pull: {reviews: {_id: review_id}}});
  await Review.findByIdAndDelete(review_id);
  res.redirect(`/places/${place_id}`);
}));

module.exports = router;