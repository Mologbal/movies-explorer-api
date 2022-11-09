const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston
      .transports
      .File({ filename: './errorsLog/request.log' }),
  ],
  format: winston
    .format
    .json(),
});

const errorLoger = expressWinston.errorLogger({
  transports: [
    new winston
      .transports
      .File({ filename: './errorsLog/error.log' }),
  ],
  format: winston
    .format
    .json(),
});

module.exports = {
  requestLogger,
  errorLoger,
};
