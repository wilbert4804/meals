const Users = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generadeTWT = require('./../utils/jwt');
const AppError = require('../utils/appError');

exports.addUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //encriptar contraseña bcrypt
  const salt = await bcrypt.genSalt(15);
  const encryptedPassword = await bcrypt.hash(password, salt);
  //punto a
  const user = await Users.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role: role.toLowerCase(),
  });
  //punto b
  const token = await generadeTWT(user.id);
  return res.status(200).json({
    status: 'success',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  //informcion de la req.body
  const { email, password } = req.body;
  //buscar el usuario y ver si existe
  const user = await Users.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`User with email: ${email} not found`, 404));
  }
  //valida la contraseña es correcta
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`incorrect email or password 😥`, 401));
  }
  //generar el token
  const token = await generadeTWT(user.id);
  //enviar la respuesta al cliente
  res.status(200).json({
    status: 'success 👍',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //
});

exports.renew = catchAsync(async (req, res, net) => {
  //
});
