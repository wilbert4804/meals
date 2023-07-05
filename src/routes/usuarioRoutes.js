const express = require('express');

const userController = require('./../controllers/userController');
const userMiddleware = require('./../middlewares/userMiddleware');
const validationMiddleware = require('./../middlewares/validationMiddleware');
const autchMiddleware = require('./../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(autchMiddleware.protect, userController.findUsers);

router
  .route('/:id')
  .get(
    userMiddleware.validUser,
    autchMiddleware.protect,
    userController.findUser
  )
  //si ay duda desactiva autchMiddleware.protectAccountOwner para ver la funcionalidad
  .patch(
    userMiddleware.validUser,
    validationMiddleware.updateUserValidation,
    autchMiddleware.protect,
    autchMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    autchMiddleware.protect,
    autchMiddleware.protectAccountOwner,
    userController.deleteUser
  );

//router.get("/:id", findUser);
//router.get("/", findUsers);
//router.post("/", addUser);
//router.patch("/:id", updateUser);
//router.delete("/:id", deleteUser);

module.exports = router;
