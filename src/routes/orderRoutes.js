const express = require('express');

const orderController = require('../controllers/orderController');
const orderMiddleware = require('../middlewares/orderMiddleware');
const autchMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(autchMiddleware.protect);

router.get(
  '/',
  autchMiddleware.restrictTo('admin'),
  orderController.findOrders
);
router.post(
  '/:mealid',
  autchMiddleware.restrictTo('admin'),
  orderController.addOrder
);

router
  .route('/:id')
  .get(
    autchMiddleware.protect,
    orderMiddleware.orderMiddleware,
    autchMiddleware.restrictTo('admin'),
    orderController.findOrder
  )
  .patch(
    autchMiddleware.protect,

    orderMiddleware.orderMiddleware,
    autchMiddleware.protectAccountOwner,
    autchMiddleware.restrictTo('admin'),
    orderController.updateOrder
  )
  .delete(
    autchMiddleware.protect,
    orderMiddleware.orderMiddleware,
    autchMiddleware.protectAccountOwner,
    autchMiddleware.restrictTo('admin'),
    orderController.deleteOrder
  );

//router.get("/:id", findUser);
//router.get("/", findUsers);
//router.post("/", addUser);
//router.patch("/:id", updateUser);
//router.delete("/:id", deleteUser);

module.exports = router;
