const Meals = require('../models/mealsModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

//selecciona todas las reparaciones
exports.findMeals = catchAsync(async (req, res, next) => {
  //logica
  const meals = await Meals.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    meals,
  });
});
//midifica una repaarcion
exports.updateMeal = catchAsync(async (req, res, next) => {
  //la parte logica
  const { meals } = req;
  const { name, price } = req.body;
  await meals.update({ name, price });
  return res.status(200).json({
    status: 'success',
    meals,
  });
});
//agrega una nueva reparacion
exports.addMeal = catchAsync(async (req, res, next) => {
  const { restauranId } = req.params;
  const { name, price } = req.body;
  const { id } = req.sessionUser;
  const meals = await Meals.create({
    name,
    price,
    restauranId,
    userId: id,
  });

  return res.status(200).json({
    status: 'success',
    meals,
  });
});
//selecciona una reparacion
exports.findMeal = catchAsync(async (req, res, next) => {
  // nos traemos el id

  const { meals } = req;

  return res.status(200).json({
    status: 'success',
    meals,
  });
});
//elimina una reparacion
exports.deleteMeal = catchAsync(async (req, res, next) => {
  // traernos el id de los parametros
  const { meals } = req;

  await meals.update({ status: false });
  return res.status(200).json({
    status: 'success',
    meals,
  });
});
