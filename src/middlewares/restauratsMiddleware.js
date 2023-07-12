const Restaurant = require('../models/restaurantsModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
exports.RestaurantMiddleware = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      // id: id
      id,
      status: true,
      is: restaurantId || id,
    },
  });
  if (!restaurant) {
    return next(
      new AppError(`product with id: ${restaurantId || id} not foun 🤢`, 404)
    );
  }
  req.restaurant = restaurant;
  next();
});
