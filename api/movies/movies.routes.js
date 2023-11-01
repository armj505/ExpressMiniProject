const express = require("express");
const router = express.Router();
const {
  moviesGet,
  movieCreate,
  fetchMovie,
  addMovieToActor,
  movieDelete,
  movieUpdate,
} = require("./movies.controllers");

router.param("movieId", async (req, res, next, movieId) => {
  const foundMovie = await fetchMovie(movieId);
  if (!foundMovie) {
    res.status(404).json({ message: "Movie Not Found" });
    next();
  }
  req.movie = foundMovie;
  next();
});

router.get("/", moviesGet);
router.post("/", movieCreate);
router.delete("/:movieId", movieDelete);
router.put("/:movieId", movieUpdate);

router.put("/:movieId/:actorId", addMovieToActor);

module.exports = router;
