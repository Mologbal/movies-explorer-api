const { ApplicationError } = require('./basicError');
const { ErrorUnauthorized } = require('./allErrors');

class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(ErrorUnauthorized, message);
  }
}

module.exports = UnauthorizedError;
