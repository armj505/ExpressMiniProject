const Actor = require("../../models/Actor");

exports.actorsGet = async (req, res, next) => {
  try {
    const allActors = await Actor.find();
    res.status(200).json(allActors);
  } catch (error) {
    next(error);
  }
};

exports.fetchActor = async (id) => {
  const foundActor = await Actor.findById(id).populate("movies");
  return foundActor;
};

exports.actorCreate = async (req, res, next) => {
  try {
    const { movieId } = req.param;
    const newActor = await Actor.create(req.body);
    res.status(201).json(`Actor ${newActor.name} has been registered`);
    if (movieId) {
      await Movies.findByIdAndUpdate("movieId", {
        $push: { actors: newActor },
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.actorDelete = async (req, res, next) => {
  try {
    const { actorId } = req.params;
    await Actor.deleteOne(actorId);
    res.status(204).json({ message: "Actor Deleted!" });
  } catch (error) {
    next(error);
  }
};

exports.actorUpdate = async (req, res, next) => {
  try {
    const { actorId } = req.params;
    await Actor.findOneAndUpdate(actorId, req.body);
    res.status(204).json({ message: "Actor Updated" });
  } catch (error) {
    next(error);
  }
};
