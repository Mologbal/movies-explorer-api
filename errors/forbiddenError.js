const { ApplicationError } = require('./basicError');
const { ErrorForbidden } = require('./allErrors');

class ForbiddenError extends ApplicationError {
  constructor(message) {
    super(ErrorForbidden, message);
  }
}

module.exports = ForbiddenError;
