const express = require("express");
const router = express.Router();
const {Genre ,validate}=require('../models/genres');
router.use(express.json());


// router.get("/", async (req, res) => {
//   const genres = await Genre.find().sort("name");
//   res.send(genres);
// });

router.get("/", async (req, res) => {
  let genreArray = Object.keys(req.query);
  if (genreArray == 0) {
    const genres = await Genre.find().sort("name");
    return res.send(genres);
  }
  const { genreName } = req.query;
  const genre = await Genre.find({
    name: genreName.toUpperCase()
  });
  res.send({ genre });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let obj = new Genre({ name: req.body.name.toUpperCase() });
  obj = await obj.save();
  res.send(obj);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const obj = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!obj) return res.status(404).send("Given id is not found....");
  res.send(obj);
});
router.delete("/:id", async (req, res) => {
  const obj = await Genre.findByIdAndRemove(req.params.id);
  if (!obj) return res.status(404).send("given id is not found....");
  res.send(obj);
});
router.get("/:id", async (req, res) => {
  const obj = await Genre.findById(req.params.id);
  if (!obj) return res.status(404).send("given id is not found....");
  res.send(obj);
});

module.exports = router;
