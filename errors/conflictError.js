const { ApplicationError } = require('./basicError');
const { ErrorConflict } = require('./allErrors');

class ConflictError extends ApplicationError {
  constructor(message) {
    super(ErrorConflict, message);
  }
}

module.exports = ConflictError;
