const express = require('express');

const reviewController = require('../controllers/reviewsControllers');
const restaurantController = require('../controllers/restaurantsController');
const restaurantMiddleware = require('../middlewares/restauratsMiddleware');
const autchMiddleware = require('../middlewares/authMiddleware');
const reviewMiddleware = require('../middlewares/reviewsMiddleware');

const router = express.Router();

router.use(autchMiddleware.protect);

router
  .route('/')
  .get(
    autchMiddleware.restrictTo('admin'),
    restaurantController.findRestaurants
  )
  .post(
    autchMiddleware.restrictTo('admin'),
    autchMiddleware.protect,
    restaurantController.addRestaurant
  );

router
  .route('/:id')
  .get(
    restaurantMiddleware.RestaurantMiddleware,
    autchMiddleware.restrictTo('admin'),
    restaurantController.findRestaurant
  )
  .patch(
    restaurantMiddleware.RestaurantMiddleware,
    autchMiddleware.protect,
    autchMiddleware.restrictTo('admin'),
    restaurantController.updateRestaurant
  )
  .delete(
    restaurantMiddleware.RestaurantMiddleware,
    autchMiddleware.protect,
    autchMiddleware.restrictTo('admin'),
    restaurantController.deleteRestauran
  );
router.use(autchMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurantMiddleware.RestaurantMiddleware,
  reviewController.addReview
);

router
  .use(
    '/reviews/:restaurantId/:id',
    reviewMiddleware.reviewsMiddleware,
    restaurantMiddleware.RestaurantMiddleware
  )
  .route('/reviews/:restaurantId/:id')
  .patch(autchMiddleware.protectAccountOwner, reviewController.updateReview)
  .delete(autchMiddleware.protectAccountOwner, reviewController.deleteReview);

module.exports = router;
