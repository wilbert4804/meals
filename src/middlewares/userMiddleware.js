const Users = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findOne({
    where: {
      // id: id
      id,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`The product with id: ${id} not found!🤢🤢`, 404));
  }
  req.user = user;
  next();
});
