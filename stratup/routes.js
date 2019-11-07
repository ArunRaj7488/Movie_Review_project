// const config=require('config');
const rental=require("../routes/rental");
const customer=require('../routes/customers');
const genres = require("../routes/genres");
const movies=require('../routes/movies');
const users=require('../routes/user');
const auth=require('../routes/auth');
const express=require('express');

module.exports=(app)=>{
//middleware
app.use(express.json())

// if(!config.get("jwtPrivateKey"))
// console.error('FATAL ERROR:jwtPrivateKey is not define');
// process.exit(1)
//routes
app.use("/api/customers",customer);
app.use("/api/genres", genres);
app.use("/api/movies",movies);
app.use("/api/rentals",rental);
app.use("/api/users",users);
app.use("/api/auth",auth);
}
