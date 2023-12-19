module.exports = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash('error_msg', 'Your are not logged in');
    return res.redirect('/login');
  }
  next();
}