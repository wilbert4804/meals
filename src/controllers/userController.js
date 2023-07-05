//user controller
const Users = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
exports.findUsers = catchAsync(async (req, res, next) => {
  //devulve todos los registros de la tabla user
  const verUsers = await Users.findAll({
    where: {
      status: 'available',
    },
  });
  return res.status(200).json({
    status: 'success ✌️',
    results: verUsers.length,
    verUsers,
  });
});
//modifica un reguistro en la tabla users
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;
    await user.update({ name, email });
    return res.status(200).json({
      status: 'success',
      message: 'update users 👍',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🤞',
    });
  }
};

//devuelve un registro de la tabla users
exports.findUser = catchAsync(async (req, res) => {
  // nos traemos el id
  //throw new Error('esto es un error generado');
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    user,
  });
});
//elimina un registros de la tabla users
exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'disabled' });
  return res.status(200).json({
    status: 'success 😒',
    message: 'the user has been deleted! 😒',
  });
});
