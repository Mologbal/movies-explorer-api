const { ErrorDefault } = require('./allErrors');

class ApplicationError extends Error {
  constructor(status = ErrorDefault, message = 'Ошибка на стороне сервера') {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { ApplicationError };
