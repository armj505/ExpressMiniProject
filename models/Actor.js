const { model, Schema } = require("mongoose");

const actorSchema = new Schema({
  name: String,
  image: String,
  bio: String,
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = model("Actor", actorSchema);
