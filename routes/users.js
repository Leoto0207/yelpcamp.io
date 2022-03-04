const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogIn)
    // passport middleware pass the method, local strategy
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.logIn);

router.get('/logout', users.logOut);


module.exports = router;
