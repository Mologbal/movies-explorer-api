// Настройка валидации входящих данных для запросов в категории "фильмы"
const { Joi, celebrate } = require('celebrate');
const { regular } = require('../utils/constants');

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().regex(regular).required(),
    trailerLink: Joi.string().uri().regex(regular).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().uri().regex(regular).required(),
    movieId: Joi.number().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    objectId: Joi.string().required().hex().length(24),
  }),
});
