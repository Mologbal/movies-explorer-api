const { ApplicationError } = require('./basicError');
const { ErrorNotFound } = require('./allErrors');

class NotFound extends ApplicationError {
  constructor(message) {
    super(ErrorNotFound, message);
  }
}

module.exports = NotFound;
