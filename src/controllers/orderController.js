const Orders = require('../models/ordersModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

//selecciona todas las reparaciones
exports.findOrders = catchAsync(async (req, res, next) => {
  //logica

  const orders = await Orders.findAll({
    where: {
      status: ['active', 'completed'],
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
    orders,
  });
});
//midifica una repaarcion
exports.updateOrder = catchAsync(async (req, res, next) => {
  //la parte logica
  const { order } = req;
  const { mealid } = req.params;
  const { id } = req.sessionUser;
  await order.update({ mealid, userId: id });
  return res.status(200).json({
    status: 'success',
    order,
  });
});
//agrega una nueva reparacion
exports.addOrder = catchAsync(async (req, res, next) => {
  const { mealid } = req.params;
  const { totalPrice, quantity } = req.body;

  //req.sessionUser viene de auchMiddleware referencia req.sessionUser = user
  const { id } = req.sessionUser;
  const order = await Orders.create({
    mealid,
    totalPrice,
    quantity,
    userId: id,
  });

  return res.status(200).json({
    status: 'success',
    order,
  });
});
//selecciona una reparacion
exports.findOrder = catchAsync(async (req, res, next) => {
  // nos traemos el id

  const { order } = req;

  return res.status(200).json({
    status: 'success',
    order,
  });
});
//elimina una reparacion
exports.deleteOrder = catchAsync(async (req, res, next) => {
  // traernos el id de los parametros
  const { order } = req;

  await order.update({ status: 'cancelled' });
  return res.status(200).json({
    status: 'success',
    order,
  });
});
