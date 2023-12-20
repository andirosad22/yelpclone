const express = require('express');
const Place = require('../models/place');
const isValidObjectId = require('../middlewares/isValidObjectId');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandle = require('../utils/ErrorHandle');
const isAuthenticated = require('../middlewares/isAuth');
const {isAuthorPlace,isAuthorReview} = require('../middlewares/isAuthor');
const ReviewController = require('../controller/reviews');


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

router.post('/', isValidObjectId('/places'), isAuthenticated,  validateReview, wrapAsync(ReviewController.store));

router.delete('/:review_id', isAuthenticated, isAuthorReview, isValidObjectId('/places'), wrapAsync(ReviewController.destroy));

module.exports = router;