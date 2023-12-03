
const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    console.log(token,"token")
       
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
         //console.log(decoded)
                req.body.username=decoded.username,
                req.body.userId=decoded.userId
                next()
            }
            else{
                console.log(err)
            }
        })
    }
    else{
        res.status(200).send({"msg":"please login"})
    }
}
module.exports={auth}