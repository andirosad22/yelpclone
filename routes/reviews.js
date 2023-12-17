const express = require('express');
const Place = require('../models/place');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandle = require('../utils/ErrorHandle');


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

router.post('/', validateReview, wrapAsync(async(req, res) => {
  const review = new Review(req.body.review);
  const place = await Place.findById(req.params.place_id);
  place.reviews.push(review);
  await review.save();
  await place.save(); 
  res.redirect(`/places/${req.params.place_id}`);
}));

router.delete('/:review_id', wrapAsync(async(req, res) => {
  const {place_id, review_id} = req.params;
  await Place.findByIdAndUpdate(req.params.place_id, {$pull: {reviews: {_id: req.params.review_id}}});
  await Review.findByIdAndDelete(review_id)
  res.redirect(`/places/${place_id}`);
  
}));

// router.delete('/:review_id', wrapAsync(async (req, res) => {
//   const {place_id, review_id} = req.params;
//   await Place.findByIdAndUpdate(place_id, {$pull: {reviews: {_id: review_id}}});
//   await Review.findByIdAndDelete(review_id);
//   res.redirect(`/places/${place_id}`);
// }));

module.exports = router;