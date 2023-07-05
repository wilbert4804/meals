const Repairs = require('../models/repairsModel');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');

//selecciona todas las reparaciones
exports.findRepairs = catchAsync(async (req, res, next) => {
  //logica
  const repairs = await Repairs.findAll({
    where: {
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    repairs,
  });
});
//midifica una repaarcion
exports.updateRepair = catchAsync(async (req, res, next) => {
  //la parte logica
  const { repair } = req;
  const { date, userId } = req.body;

  await repair.update({ date, userId });
  return res.status(200).json({
    status: 'success',
    repair,
  });
});
//agrega una nueva reparacion
exports.addRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description, userId } = req.body;
  const repair = await Repairs.create({
    date,
    motorsNumber,
    description,
    userId,
  });

  return res.status(200).json({
    status: 'success',
    repair,
  });
});
//selecciona una reparacion
exports.findRepair = catchAsync(async (req, res, next) => {
  // nos traemos el id

  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    repair,
  });
});
//elimina una reparacion
exports.deleteRepair = catchAsync(async (req, res, next) => {
  // traernos el id de los parametros
  const { repair } = req;

  await repair.update({ status: 'cancelled' });
  return res.status(200).json({
    status: 'success',
    repair,
  });
});
