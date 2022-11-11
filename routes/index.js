const express = require('express');
const { registerValidation, loginValidation } = require('../validation/auth');

const app = express();

const { createUser, login } = require('../controllers/users');

app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);

module.exports = app;
