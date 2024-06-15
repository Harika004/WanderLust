const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateListing,isloggedIn, isOwner } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// index and create routes has been created in single route
router.route("/")
.get(wrapAsync(listingcontroller.index))
.post(isloggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingcontroller.createListing));


// New route
router.get("/new",isloggedIn,listingcontroller.renderNewForm);


// show route, update route and delete route has been created in single route 
router.route("/:id")
.get(wrapAsync(listingcontroller.showListing))
.put(isloggedIn,isOwner,upload.single('listing[image]'), wrapAsync(listingcontroller.updateListing))
.delete(isloggedIn,isOwner,wrapAsync(listingcontroller.destroyListing));




// Edit route
router.get("/:id/edit", isloggedIn,isOwner, wrapAsync(listingcontroller.renderEditForm)); 
 


module.exports = router;