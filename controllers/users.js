const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFound = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');
const { getJwtToken } = require('../utils/jwt');
const { errorLogger } = require('../middlewares/logger');

// выдаст информацию о текущем пользователе
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    if (!user) {
      return next(new NotFound('Такого пользователя не существует'));
    }
    return res.status(200).send(user);
  }).catch((err) => {
    next(err);
  });
};

// создаст нового пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!email) {
    throw new BadRequestError('Email  не могут быть пустыми');
  }
  if (!password) {
    throw new BadRequestError('Password пустой');
  }
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser = { ...user._doc };
      delete newUser.password;
      res.status(201).send(newUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

// функция входа
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);
      return res.send({ token });
    })
    .catch(next);
};

// обновит информацию о пользователе
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound('Такого пользователя не существует');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, updateUser, getCurrentUser, login,
};
