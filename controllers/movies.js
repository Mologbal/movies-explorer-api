const Movie = require('../models/movie');
const NotFound = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

// выдаст список фильмов
const getMovies = (req, res, next) => {
  Movie.find({}).sort([['createdAt', -1]])
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

// создаст новый фильм
const createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

// удалит фильм
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie
    .findById(movieId)
    .orFail(new NotFound('Фильм с переданным id не обнаружен'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError('Вы не можете удалить чужой фильм'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм успешно удалён!' }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
