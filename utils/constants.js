const regular = /https?:\/\/(w{3}\.)?([\w-]{1,}\.)+[\w._~:/?#[\]@!$&'()*+,;=]*#?/i;

const allowedCors = [
  'https://emoiseev.mesto.nomoredomains.sbs',
  'http://emoiseev.mesto.nomoredomains.sbs',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS, regular };
