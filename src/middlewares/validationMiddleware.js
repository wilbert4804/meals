const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      error: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidataion = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Pasword cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at leat 8 characters long'),
  body('role').notEmpty().withMessage('amount cannot be empty'),
  validFields,
];

exports.updateUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Pasword cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at leat 8 characters long'),
  body('role').notEmpty().withMessage('amount cannot be empty'),
  validFields,
];
