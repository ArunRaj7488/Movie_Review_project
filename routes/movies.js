const express=require('express');
const router=express.Router();
const{Movies, validate}=require('../models/movies');
const {Genre}=require('../models/genres')
router.use(express.json());

router.get('/',async(req,res)=>{
    const movies=await Movies.find(req.body);
    res.send(movies);
})
router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genres=await Genre.findById(req.body.genresId);
    if(!genres) return res.status(400).send('Invalid Genres');
    const movie = new Movies({ 
    title: req.body.title,
    genres: {
      _id: genres._id,
      name: genres.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();
  
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genresId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movies.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genres: {
        _id: genres._id,
        name: genres.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movies.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movies.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router; 