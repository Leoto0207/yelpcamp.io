const express = require('express');
// use express router will seperate the params.id so you have to add mergeParams true to fix it
const router = express.Router({mergeParams: true});
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');




// every single campground with its own review
router.post('', isLoggedIn , validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;