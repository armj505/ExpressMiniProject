const { model, Schema } = require("mongoose");

const movieSchema = new Schema({
  title: { type: String, required: true },
  image: String,
  overview: String,
  actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = model("Movie", movieSchema);
