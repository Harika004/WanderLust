const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateReview, isloggedIn, isReviewAuthor } = require("../middleware.js");

const reviewcontroller = require("../controllers/reviews.js");


// reviews: POST route
router.post("/",isloggedIn,validateReview, wrapAsync(reviewcontroller.createReview));

// Delete review route
router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapAsync(reviewcontroller.destroyReview));
module.exports = router;