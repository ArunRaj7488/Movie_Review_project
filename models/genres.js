const Joi=require('joi');
const mongoose=require('mongoose');

const genreSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50
    }
  })

const Genre = mongoose.model("Genre",genreSchema);


  function validateJoi(gener) {
    const schema = {
      name: Joi.string()
        .min(4)
        .required()
    };
    return Joi.validate(gener, schema);
  }
  exports.validate=validateJoi;
  exports.Genre=Genre;
  exports.GenreSchema=genreSchema;
  