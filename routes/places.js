
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandle = require('../utils/ErrorHandle');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuthenticated = require('../middlewares/isAuth')
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
    return next(new ErrorHandle(msg, 400));
  }else{
    next();
  };
};

router.get('/', wrapAsync(PlaceController.index));

router.get('/create', isAuthenticated, (req, res) => {
  res.render('places/create');
});

router.post('/',isAuthenticated, validatePlace, wrapAsync(PlaceController.store));
router.get('/:id', isValidObjectId('/places'), wrapAsync(PlaceController.show));
router.get('/:id/edit',isAuthorPlace, isAuthenticated, wrapAsync(PlaceController.edit));

  
router.put('/:id', isAuthenticated,isAuthorPlace, isValidObjectId('/places'), validatePlace, wrapAsync(PlaceController.update));

router.delete('/:id',isAuthorPlace, isAuthenticated, wrapAsync(async(req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Place deleted successfully');
  res.redirect('/places');
}));

module.exports= router;