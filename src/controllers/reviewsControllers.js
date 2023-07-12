const Reviews = require('../models/reviewsModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

//midifica una repaarcion
exports.updateReview = catchAsync(async (req, res, next) => {
  //la parte logica
  const { reviews } = req;
  const { restaurantid } = req.params;
  const { id } = req.sessionUser;
  const { comment } = req.body;

  await reviews.update({ comment, rating, userId: id, restaurantid });

  return res.status(200).json({
    status: 'success',
  });
});
//agrega una nueva reparacion
exports.addReview = catchAsync(async (req, res, next) => {
  const { restaurantid } = req.params;
  const { comment, rating } = req.body;
  const userId = req.sessionUser.id;
  const reviews = await Reviews.create({
    comment,
    restaurantid,
    rating,
    userId,
  });

  return res.status(200).json({
    status: 'success',
    reviews,
  });
});
//selecciona una reparacion
exports.findReview = catchAsync(async (req, res, next) => {
  // nos traemos el id

  const { reviews } = req;

  return res.status(200).json({
    status: 'success',
    reviews,
  });
});
//elimina una reparacion
exports.deleteReview = catchAsync(async (req, res, next) => {
  // traernos el id de los parametros
  const { reviews } = req;

  await reviews.update({ status: false });
  return res.status(200).json({
    status: 'success',
    reviews,
  });
});
