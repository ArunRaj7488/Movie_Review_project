const mongoose=require('mongoose');

mongoose
  .connect("mongodb://localhost:27017/project")
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log("Not connected to mongodb..."));
