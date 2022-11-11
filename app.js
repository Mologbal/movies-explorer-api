require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const NotFound = require('./errors/notFoundError');
const ErrorDefault = require('./errors/allErrors');
const loginAndRegister = require('./routes/index');
const { auth } = require('./middlewares/auth');

const { PORT = 3002 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт!');
  }, 0);
});

app.use(cors({
  origin: ['https://praktikum.tk',
    'http://praktikum.tk',
    'localhost:3000',
    'http://localhost:3000',
    'https://localhost:3000',
    'https://localhost:3001',
    'https://localhost:3002',
    'http://api.molow.nomoredomains.icu',
    'https://api.molow.nomoredomains.icu'],
}));
// Регистрация и авторизация
app.use('/', loginAndRegister);
// Защита роутов от неавторизованных пользователей
app.use(auth);

// Логи ошибок, запись ошибок в файл
const { requestLogger, errorLoger } = require('./middlewares/logger');

// Логгер запросов до маршрутов
app.use(requestLogger);

// Защищенные роуты
app.use(userRouter);
app.use('/', movieRouter);
app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

// Логгер ошибок и далее их обработка
app.use(errorLoger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(ErrorDefault).send({ message: 'Internal Server Error' });
  }
  next();
});

app.listen(PORT);
