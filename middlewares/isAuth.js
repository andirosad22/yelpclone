module.exports = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash('error_msg', 'Your are not logged in');
    res.redirect('/login');
  }
  next();
}