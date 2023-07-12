const Meals = require('../models/mealsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
exports.mealsMiddleware = catchAsync(async (req, res, next) => {
  const { id } = req.params; //DESTRUCION DE OBJETOS

  const meals = await Meals.findOne({
    where: {
      // id: id
      id,
      status: true,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });
  if (!meals) {
    return next(new AppError(`product with id: ${id} not foun 🤢`, 404));
  }
  req.user = meals.user;
  req.meals = meals;
  next();
});
