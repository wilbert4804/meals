const express = require('express');

const mealsController = require('../controllers/mealsController');
const mealsMiddleware = require('../middlewares/mealsMiddleware');
const autchMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(autchMiddleware.protect);

router.get('/', autchMiddleware.restrictTo('admin'), mealsController.findMeals);

//

router.post(
  '/:restauranId',
  autchMiddleware.restrictTo('admin'),
  mealsController.addMeal
);

router
  .route('/:id')
  .get(
    mealsMiddleware.mealsMiddleware,
    autchMiddleware.restrictTo('admin'),
    mealsController.findMeal
  )
  .patch(
    mealsMiddleware.mealsMiddleware,
    autchMiddleware.restrictTo('admin'),
    mealsController.updateMeal
  )
  .delete(
    mealsMiddleware.mealsMiddleware,
    autchMiddleware.restrictTo('admin'),
    mealsController.deleteMeal
  );

//router.get("/:id", findUser);
//router.get("/", findUsers);
//router.post("/", addUser);
//router.patch("/:id", updateUser);
//router.delete("/:id", deleteUser);

module.exports = router;
