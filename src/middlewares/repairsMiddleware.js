const Repairs = require('./../models/repairsModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
exports.repairsMiddleware = catchAsync(async (req, res, next) => {
  const { id } = req.params; //DESTRUCION DE OBJETOS

  const repair = await Repairs.findOne({
    where: {
      // id: id
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return next(new AppError(`product with id: ${id} not foun 🤢`, 404));
  }
  req.repair = repair;
  next();
});
