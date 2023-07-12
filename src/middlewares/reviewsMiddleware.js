const Reviews = require('../models/reviewsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
exports.reviewsMiddleware = catchAsync(async (req, res, next) => {
  const { id } = req.params; //DESTRUCION DE OBJETOS

  const reviews = await Reviews.findOne({
    where: {
      // id: id
      id,
      //status: true,
    },
    include: [
      {
        model: User,
      },
    ],
  });
  if (!reviews) {
    return next(new AppError(`product with id: ${id} not foun 🤢`, 404));
  }
  req.reviews = reviews;
  req.user = reviews.user;

  req.order = order;
  next();
});
