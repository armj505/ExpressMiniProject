const express = require("express");
const {
  reviewsGet,
  reviewPost,
  reviewUpdate,
  reviewDelete,
} = require("./reviews.controllers");
const { fetchMovie } = require("../movies/movies.controllers");
const router = express.Router();

router.param("movieId", async (req, res, next, movieId) => {
  const foundMovie = await fetchMovie(movieId);
  if (!foundMovie) {
    res.status(404).json({ message: "Movie Not Found" });
    next();
  }
  req.movie = foundMovie;
  next();
});

router.get("/:movieId", reviewsGet);
router.post("/:movieId", reviewPost);

router.delete("/:movieId/:reviewId", reviewDelete);
router.post("/:movieId/:reviewId", reviewUpdate);

module.exports = router;
