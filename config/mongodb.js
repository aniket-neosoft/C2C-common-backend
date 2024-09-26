const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aniketKumar:HfagiALtKLJIkxuX@cluster0.r6lji.mongodb.net/")
.then((success)=>console.log("connected......"))
.catch(err=>console.log(err))