const Actor = require("../../models/Actor");
const Movie = require("../../models/Movie");

exports.moviesGet = async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.status(200).json(allMovies);
  } catch (error) {
    next(error);
  }
};

exports.fetchMovie = async (id) => {
  const movie = await Movie.findById(id).populate("actors");
  return movie;
};

exports.movieCreate = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);
    res
      .status(201)
      .json({ message: `Movie ${newMovie.title} has been registered` });
  } catch (error) {
    next(error);
  }
};

exports.movieDelete = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    await Movie.deleteOne(movieId);
    res.status(204).json({ message: "Movie Deleted!" });
  } catch (error) {
    next(error);
  }
};

exports.movieUpdate = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    await Movie.findOneAndUpdate(movieId, req.body);
    res.status(202).json({ message: "Movie updated" });
  } catch (error) {
    next(error);
  }
};

exports.addMovieToActor = async (req, res, next) => {
  try {
    const { movieId, actorId } = req.params;
    const movie = await Movie.findById(movieId);
    const actor = await Actor.findById(actorId);

    if (!movie || !actor) {
      res.status(404).json("Acotr or movie not found!");
    }

    await movie.updateOne({ $push: { actors: actor } });
    await actor.updateOne({ $push: { movies: movie } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
