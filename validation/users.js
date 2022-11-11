// Настройка валидации входящих данных для запросов в категории "пользователь"
const { Joi, celebrate } = require('celebrate');

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});
