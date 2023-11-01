const express = require("express");
const router = express.Router();
const {
  actorsGet,
  actorCreate,
  fetchActor,
  actorDelete,
  actorUpdate,
} = require("./actors.controllers");

router.param("actorId", async (req, res, next, actorId) => {
  const foundActor = await fetchActor(actorId);
  if (!actorId) {
    res.status(404).json({ message: "Actor Not Found" });
    next();
  }
  req.actor = foundActor;
  next();
});
router.get("/", actorsGet);
router.post("/", actorCreate);
router.delete("/:actorId", actorDelete);
router.put("/:actorId", actorUpdate);

module.exports = router;
