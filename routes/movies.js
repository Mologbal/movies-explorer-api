const router = require('express').Router();
const { createMovieValidation, deleteMovieValidation } = require('../validation/movies');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// создаст фильм
router.post('/movies', createMovieValidation, createMovie);

// вернёт список фильмов
router.get('/movies', getMovies);

// удалит фильм по идентификатору
router.delete('/movies/:objectId', deleteMovieValidation, deleteMovie);

module.exports = router;
