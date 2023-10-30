const mongoose=require("mongoose");
const express=require("express")

const {postmodel}=require("../module/post.module");
const { auth } = require("../middleware/auth");

const postRouter=express.Router();

postRouter.use(auth)

postRouter.post("/add",async(req,res)=>{
    try{
        const post=new postmodel(req.body);
        await post.save();
        res.status(200).send({"msg":"new post successfully posted"})
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})

postRouter.get("/",async(req,res)=>{
    try{

        const posts=await postmodel.find({name:req.body.name})
        res.status(200).send(posts)
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})


postRouter.patch("/update/:postId",async(req,res)=>{
    console.log(req.params)
    const {postId}=req.params

    const posts=await postmodel.findOne({_id:postId})
    try{
        console.log(posts);
        if(req.body.userId==posts.userId){
            await postmodel.fingByIdAndUpdate({_id:postId},req.body);
            res.status(200).send({"msg":`post with id ${postId} is upadtes successfully`})
        }else{
            res.status(200).send({"msg":"you are not authorized"})
        }

    }catch(err){
        res.status(400).send({"err":err})
    }
    })

   postRouter.delete("/delete/:postId",async(req,res)=>{
    const {postId}=req.params
    console.log(req.params)

     const posts=await postmodel.findOne({_id:postId})
    console.log(postId,posts,"req.body",req.body)
    try{
        console.log(posts);
        if(req.body.userId==posts.userId){
            await postmodel.fingByIdAndDelete({_id:postId});
            res.status(200).send({"msg":`post with id ${postId} is deleted successfully`})
        }else{
            res.status(200).send({"msg":"you are not authorized"})
        }

    }catch(err){
        res.status(400).send({"err":err})
    }
})





module.exports={postRouter}

