let jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
      jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{
          if(err) return reject(err);

          return resolve(decode);
      })
    })
}


const auethenticate=async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.send(400).send("Token is not valid")
    }
    
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.send(400).send("Token is not valid") 
    }
    const token =req.header.authorization.split(" ")[1];
    let decode;
    try {
        decode=await verifyToken(token);
    } catch (error) {
        return res.status(400).send({message : "Authorization token not found or incorrect"})
    }
    req.user=decode.user;
    return next();
}
module.exports=auethenticate;