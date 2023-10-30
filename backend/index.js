const express=require("express");
const cors=require("cors");
const app=express();
const {connection}=require("./db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.rotes");

app.use(express.json());
app.use(cors())


app.use("/user",userRouter)
app.use("/posts",postRouter)




app.get("/",(req,res)=>{
    res.status(200).send("ok worki")
})



try{
    await connection
    console.log("db connected to atlas ");
    console.log("server running at 4500")
}
catch(err){
    console.log(err)
}

app.listen(4500,async()=>{
try{
    //await connection
    console.log("db connected to atlas ");
    console.log("server running at 4500")
}
catch(err){
    console.log(err)
}
})