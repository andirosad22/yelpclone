const mongoose = require('mongoose');

module.exports = (redirectUrl = '/') => {
  return async(req, res, next) => {
    const paramId = ['id', 'place_id', 'review_id'].find(param => req.params[param]);
    if (!paramId) return next(); // no id provided in url -> continue to the next middleware function

    const id = req.params[paramId];
    if(!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error_msg', 'Invalid Id / data not pound');
      return res.redirect(redirectUrl);
    };
    next();
  };
};