const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const AuthController = require('../controller/auth');

router.route('/register')
  .get(AuthController.register)

  .post(wrapAsync(AuthController.registered));

router.route('/login')
  .get(AuthController.login)
  .post(passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: {
    type: 'error_msg',
    msg: 'Invalid username or password',
  },
}), AuthController.logged);

router.post('/logout', AuthController.logout);

module.exports =router;