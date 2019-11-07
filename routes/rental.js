
const express=require('express');
const router=express.Router();
const {Rental,validate}=require('../models/rental');
const {Customer} =require('../models/customer');
const {Movies}=require('../models/movies');

router.use(express.json());

router.get('/',async(req,res)=>{
    const rental=await Rental.find(req.body);
    res.send(rental);
});
router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    const customer= await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Ivalid customer');

    const movies=await Movies.findById(req.body.moviesId);
    if(!movies) return res.status(400).send('Ivalid Movies');

    if (movies.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movies: {
      _id: movies._id,
      title: movies.title,
      dailyRentalRate: movies.dailyRentalRate
    }
  });
  rental = await rental.save();

  movies.numberInStock--;
  movies.save();
  
  res.send(rental);
});

module.exports=router;