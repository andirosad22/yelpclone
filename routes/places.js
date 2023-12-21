
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ErrorHandle');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuthenticated = require('../middlewares/isAuth')
const upload = require('../config/multer');
// Models
const Place = require('../models/place');
const PlaceController = require('../controller/places');

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
    return next(new ExpressError(msg, 400));
  }else{
    next();
  };
};

router.route('/')
    .get(wrapAsync(PlaceController.index))
    .post(isAuthenticated,upload.array('image', 5), validatePlace, wrapAsync(PlaceController.store));

router.get('/create', isAuthenticated, PlaceController.create);

router.route('/:id')
    .get(isValidObjectId('/places'), wrapAsync(PlaceController.show))
    .put(isAuthenticated,upload.array('image', 5), isAuthorPlace, isValidObjectId('/places'), validatePlace, wrapAsync(PlaceController.update))
    .delete(isAuthorPlace, isAuthenticated, wrapAsync(PlaceController.destroy));



router.get('/:id/edit',isAuthorPlace, isAuthenticated, wrapAsync(PlaceController.edit));

module.exports= router;