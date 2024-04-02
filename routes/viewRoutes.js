const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

// Render base template
router.get(
  "/",
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get("/tour/:slug", authController.isLoggedIn, viewsController.getTour);

router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
router.get("/signup", authController.isLoggedIn, viewsController.getSignUpForm);
router.get("/me", authController.protect, viewsController.getAccount);
router.get("/my-tours", authController.protect, viewsController.getMyTours);

router.post(
  "/submit-user-data",
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
