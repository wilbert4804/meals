const express = require('express');

//controllers
const authController = require('../controllers/autchController');

//middlewares
const validationMiddleware = require('./../middlewares/validationMiddleware');
const router = express.Router();

router
  .route('/addUser')
  .post(validationMiddleware.createUserValidataion, authController.addUser);

router.route('/login').post(authController.login);

router.route('/renew', authController.renew);

router.patch('/password/:id', authController.updatePassword);

module.exports = router;
