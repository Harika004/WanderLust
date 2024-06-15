const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapasync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/users.js");

// signup get and post are written in single route
router.route("/signup")
.get(usercontroller.renderSignupForm)
.post(wrapasync(usercontroller.signup));

// login get and post are written in single route
router.route("/login")
.get(saveRedirectUrl, usercontroller.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) , usercontroller.login);

router.get("/logout", usercontroller.logout);
module.exports = router;

