const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

// возвращает текущего пользователя
router.get('/me', getCurrentUser);

// обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
