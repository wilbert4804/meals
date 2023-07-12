const Restaurant = require('../models/restaurantsModels');
//const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

//selecciona todas las reparaciones
exports.findRestaurants = catchAsync(async (req, res, next) => {
  //logica
  const restaurant = await Restaurant.findAll({
    where: {
      status: true,
    },
    /*include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],*/
  });

  return res.status(200).json({
    status: 'success',
    restaurant,
    result: restaurant.length,
  });
});
//midifica una repaarcion
exports.updateRestaurant = catchAsync(async (req, res, next) => {
  //la parte logica
  const { restaurant } = req;
  const { name, address } = req.body;
  //const { id } = req.sessionUser;
  await restaurant.update({ name, address });
  return res.status(200).json({
    status: 'success',
    restaurant,
  });
});
//agrega una nueva reparacion
exports.addRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;
  //const { id } = req.sessionUser;
  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
    //userId: id,
  });

  return res.status(200).json({
    status: 'success',
    restaurant,
  });
});
//selecciona una reparacion
exports.findRestaurant = catchAsync(async (req, res, next) => {
  // nos traemos el id

  const { restaurant } = req;

  return res.status(200).json({
    status: 'success',
    restaurant,
  });
});
//elimina una reparacion
exports.deleteRestauran = catchAsync(async (req, res, next) => {
  // traernos el id de los parametros
  const { restaurant } = req;

  await restaurant.update({ status: false });
  return res.status(200).json({
    status: 'success',
    restaurant,
  });
});
