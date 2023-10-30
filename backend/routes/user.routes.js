const mongoose=require("mongoose");
const express=require("express")

const {usermodel}=require("../module/user.module");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { blackmodel } = require("../module/blacklist");

const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,password,city,age,is_married}=req.body;

    const user=await usermodel.findOne({email});
    if(user){
        res.status(200).send({"msg":"user already exists with this email"})
    }

    try{
        bcrypt.hash(password,5,async(err, hash) =>{
            if(err){
                res.status(200).send({"msg":"not able to hash pasword"})
            }else{
                const user=new usermodel({name,email,gender,password:hash,city,age,is_married});
                await user.save();
                res.status(200).send({"msg":"new user created","newuser":res.body})
            }
        
        });

    }
    catch(err){
        res.status(400).send({"err":err})
    }
})

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;

    try{
        const user=await usermodel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({username:user.name,userId:user._id},"masai",{expiresIn:"7d"});
                    res.status(200).send({"msg":"loginsuccessful","token":token})
                }
                else{
                    res.status(200).send({"msg":"wrong credentials"})
                }
            })

        }else{
            res.status(200).send({"msg":"user not exists"})
        }

    }
    catch(err){
        res.status(400).send({"err":err})
    }
})


userRouter.post("/logout",async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try{
       const black =new blackmodel(token);
       await black.save()
       res.status(200).send({"msg":"succesfully logout"})
    }
    catch(err){
        res.status(400).send({"err":err})
    }

})



module.exports={userRouter}