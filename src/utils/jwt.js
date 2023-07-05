const jwt = require('jsonwebtoken');

const generadeTWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED, // del archivo .env de las variables de entorno
      {
        expiresIn: process.env.JWT_EXPIRE_IN, // del archivo .env de las variables de entorno
      },
      (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      }
    );
  });
};
module.exports = generadeTWT;
