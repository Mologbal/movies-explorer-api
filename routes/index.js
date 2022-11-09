const express = require('express');

const app = express();

const { createUser, login } = require('../controllers/users');

app.post('/signin', login);
app.post('/signup', createUser);

module.exports = app;
