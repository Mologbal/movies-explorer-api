const regular = /^(https?:\/\/)(www\.)?([a-z1-9-]{1,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;

const allowedCors = [
  'https://emoiseev.mesto.nomoredomains.sbs',
  'http://emoiseev.mesto.nomoredomains.sbs',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS, regular };
