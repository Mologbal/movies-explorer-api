const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// создаст карточку
router.post('/movies', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?([\w-]{1,}\.)+[\w._~:/?#[\]@!$&'()*+,;=]*#?/i),
  }),
}), createMovie);

// вернёт карточки
router.get('/movies', getMovies);

// удалит карточку по идентификатору
router.delete('/movies/_id', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
