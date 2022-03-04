const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview = async(req, res)=> {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    const review = await Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', "Successfully create a new review!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const {id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', "successfully delete the review!");
    res.redirect(`/campgrounds/${id}`);
}