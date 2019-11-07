const config=require('config');
const Joi = require("joi");
Joi.objectId=require('joi-objectid')(Joi)

const express = require("express");
const app=express();

if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
  }
  

//database
require('./stratup/db');
//routes
require('./stratup/routes')(app);


app.listen(3500);

console.log("listinig on port 3500.......");
