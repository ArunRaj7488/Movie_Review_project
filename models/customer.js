const Joi=require('joi');
const mongoose= require('mongoose');


const customerSchema= new mongoose.Schema({
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
})
 const Customer=mongoose.model('Customer',customerSchema);

 function validateCustomer(customer){
         const schema={
                        name:Joi.string().max(20).min(3).required(),
                         isGold:Joi.boolean(),
                        phone:Joi.string().max(13).min(10).required()
                     }
         return Joi.validate(customer,schema);
}
exports.validate=validateCustomer;
exports.Customer=Customer;