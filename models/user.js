const Joi=require('joi');
const jwt=require('jsonwebtoken');
const config=require('config')

const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:30,
        required:true
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true,
      
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1024,
        required:true
    },
    isAdmin:Boolean
});

//information expert principle//information..
userSchema.methods.generateAuthToken=function(){
    const token= jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get("jwtPrivateKey"));
    return token;

}
 const User=mongoose.model('User',userSchema);

 function validateUser(user){
     const schema={
         name:Joi.string().min(3).max(30).required(),
         email:Joi.string().min(5).max(255).required(),
         password:Joi.string().min(5).max(255).required(),
        
        }
        return Joi.validate(user,schema)
 }
 exports.User=User;
 exports.validate=validateUser;