const { model, Schema } = require("mongoose");

const reviewSchema = new Schema({
  author: String,
  date: String,
  title: String,
  review: String,
  rating: String,
  movie: { type: Schema.Types.ObjectId, ref: "Movie" },
});

module.exports = model("Review", reviewSchema);
