const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const AuthController = require('../controller/auth');

router.get('/register', AuthController.register);

router.post('/register', wrapAsync(AuthController.registered));

router.get('/login', AuthController.login);
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: {
    type: 'error_msg',
    msg: 'Invalid username or password',
  },
}), AuthController.logged);

router.post('/logout', AuthController.logout);

module.exports =router;