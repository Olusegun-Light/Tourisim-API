const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoute");

const router = express.Router();

// Param middleware
// router.param("id", tourController.checkId);

// Nested Routes
// POST /tour/tourId/reviews
//  POST reviews
router.use("/:tourId/reviews", reviewRouter);

//  Tour Routes
router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );

// /tour-within/:distance/center/:latlng/unit/:unit
// /tour-within/223/center/6.602176866032166, 3.3494485646336623/unit/mi
router
  .route("/tour-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getTourWithin);

router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;
