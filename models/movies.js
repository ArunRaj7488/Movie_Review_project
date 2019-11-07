const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const{GenreSchema}=require('./genres')

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
        maxlength:255
     },
    genres:{
        type:GenreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
});
const Movies=mongoose.model('Movies',movieSchema);

function validateMovies(movie){
    const schema={
        title:Joi.string().max(50).required(),
        genresId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    }
    return Joi.validate(movie,schema)
}
exports.Movies=Movies;
exports.validate=validateMovies;