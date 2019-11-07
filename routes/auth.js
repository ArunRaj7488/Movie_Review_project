const Joi=require('joi');
const config=require('config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const _=require('lodash');
const router=require('express').Router();
const {User}=require('../models/user');


router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword=await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    const token=user.generateAuthToken();
 
    //const token= jwt.sign({_id:user._id},config.get("jwtPrivateKey"));

    res.send(token)

    });

    function validate(auth){
        const schema={
            email:Joi.string().min(5).max(255).required(),
            password:Joi.string().min(5).max(255).required(),
           }
           return Joi.validate(auth,schema)
    }
    
module.exports=router;