const express = require('express');

const reviewController = require('../controllers/reviewsControllers');
const reviewMiddleware = require('../middlewares/reviewsMiddleware');
const autchMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(autchMiddleware.protect);

router.post(
  '/:restaurantid',
  autchMiddleware.restrictTo('admin'),
  reviewController.addReview
);

router.patch(
  '/:restaurantid',
  reviewMiddleware.reviewsMiddleware,
  autchMiddleware.restrictTo('admin'),
  reviewController.updateReview
);
router.delete(
  '/:restaurantid',
  reviewMiddleware.reviewsMiddleware,
  autchMiddleware.restrictTo('admin'),
  reviewController.deleteReview
);

module.exports = router;
