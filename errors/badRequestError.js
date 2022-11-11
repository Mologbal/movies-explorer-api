const { ApplicationError } = require('./basicError');
const { ErrorValidation } = require('./allErrors');

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(ErrorValidation, message);
  }
}

module.exports = BadRequestError;
