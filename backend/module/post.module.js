const mongoose=require("mongoose");
const postschma=mongoose.Schema({
   title:String,
   body:String,
   device:String,
   no_of_comments:Number,
   username:String,
   userId:String
},{versionKey:false});

const postmodel=mongoose.model("post",postschma);
module.exports={postmodel}