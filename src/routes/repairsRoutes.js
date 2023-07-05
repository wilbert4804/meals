const express = require('express');

const repairController = require('./../controllers/repairsController');
const repairsMiddleware = require('./../middlewares/repairsMiddleware');
const autchMiddleware = require('./../middlewares/authMiddleware');

const router = express.Router();

router.use(autchMiddleware.protect);

router
  .route('/')
  .get(autchMiddleware.restrictTo('employee'), repairController.findRepairs)
  .post(autchMiddleware.restrictTo('employee'), repairController.addRepair);

router
  .route('/:id')
  .get(
    repairsMiddleware.repairsMiddleware,
    autchMiddleware.restrictTo('employee'),
    repairController.findRepair
  )
  .patch(
    repairsMiddleware.repairsMiddleware,
    autchMiddleware.restrictTo('employee'),
    repairController.updateRepair
  )
  .delete(
    repairsMiddleware.repairsMiddleware,
    autchMiddleware.restrictTo('employee'),
    repairController.deleteRepair
  );

//router.get("/:id", findUser);
//router.get("/", findUsers);
//router.post("/", addUser);
//router.patch("/:id", updateUser);
//router.delete("/:id", deleteUser);

module.exports = router;
