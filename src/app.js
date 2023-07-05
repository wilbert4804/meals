const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

//rutas
const autchRouter = require('./routes/authRoutes');
const userRouter = require('./routes/usuarioRoutes');
const repairRoutes = require('./routes/repairsRoutes');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  const time = new Date().toISOString();

  req.requestTime = time;
  next();
});
//rutas

app.use('/api/v1/auth', autchRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRoutes);
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server! 🤢`, 404)
  );
});
app.use(errorController);
module.exports = app;
