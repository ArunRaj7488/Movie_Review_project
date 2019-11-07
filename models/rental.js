const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');

const rentalSchema=new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:3,
                maxlength:20
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                maxlength:13,
                minlength:10
            }
        }),
        required:true
    },
    movies:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                maxlength:255
             },
            
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            }
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now,
    },
    dateReturned:{
        type:Date,
        required:true,
        default:Date.now,
    },
    rentalfee:{
        type:Number,
        min:0
    }
})
const Rental=mongoose.model('Rental',rentalSchema);
 function validateRental(rental){
     const schema={
         customerId:Joi.objectId().required(),
         moviesId:Joi.objectId().required(),
     }
     return Joi.validate(rental,schema);
 }
 exports.Rental=Rental;
 exports.validate=validateRental;