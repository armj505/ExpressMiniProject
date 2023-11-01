const express = require("express");
const app = express();
const moviesRoutes = require("./api/movies/movies.routes");
const actorsRoutes = require("./api/actors/actors.routes");
const reviewRoutes = require("./api/reviews/reviews.routes");
const connectDB = require("./database");
require("dotenv").config();
const port = process.env.PORT;
const morgan = require("morgan");
const cors = require("cors");

connectDB();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/movies", moviesRoutes);
app.use("/api/actors", actorsRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log("Server is listening to Port " + port);
});
