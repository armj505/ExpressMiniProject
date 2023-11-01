const Movie = require("../../models/Movie");
const Review = require("../../models/Review");

exports.reviewsGet = async (req, res, next) => {
  try {
    const reviews = await Review.find({ movie: req.movie._id });
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.reviewPost = async (req, res, next) => {
  try {
    const review = await Review.create({ ...req.body, movie: req.movie._id });
    await req.movie.updateOne({ $push: { reviews: review } });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

exports.reviewDelete = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    await Review.deleteOne(reviewId);
  } catch (error) {
    next(error);
  }
};

exports.reviewUpdate = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    await Review.updateOne(reviewId);
  } catch (error) {
    next(error);
  }
};
