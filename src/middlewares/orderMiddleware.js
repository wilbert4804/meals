const Orders = require('../models/ordersModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
exports.orderMiddleware = catchAsync(async (req, res, next) => {
  const { id } = req.params; //DESTRUCION DE OBJETOS

  const order = await Orders.findOne({
    where: {
      // id: id
      id,
      status: 'active',
    },

    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });
  if (!order) {
    return next(new AppError(`product with id: ${id} not foun 🤢`, 404));
  }
  //req.user = order.user es para utilizar autchMiddleware.protectAccountOwner
  req.user = order.user;
  req.order = order;
  next();
});
