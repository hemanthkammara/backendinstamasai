const mongoose=require("mongoose");
const blackschma=mongoose.Schema({

   
   userId:String
},{versionKey:false});

const blackmodel=mongoose.model("black",blackschma);
module.exports={blackmodel}

