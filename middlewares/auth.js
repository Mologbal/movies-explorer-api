const jwt = require('jsonwebtoken');
const { NODE_ENV, YOUR_JWT } = process.env;
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Сначала авторизируйтесь');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    console.log(process.env);
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.YOUR_JWT : 'secret-code');
  } catch (err) {
    next(new UnauthorizedError('Сначала авторизируйтесь'));
    return;
  }

  req.user = payload;

  next();
};
