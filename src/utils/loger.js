const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      (info) => `[${info.timestamp}] ${info.level} ${info.message} ${info}`
    )
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
});
//winston sirve para revisar errores fecha, hora, la linea donde se genero el error se genera por si sola la carpta y archivo log
