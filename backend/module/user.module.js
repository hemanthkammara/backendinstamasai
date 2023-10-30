const mongoose=require("mongoose");
const userschma=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String,
    is_married:Boolean
},{versionKey:false});

const usermodel=mongoose.model("user",userschma);
module.exports={usermodel}