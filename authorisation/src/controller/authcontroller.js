const User=require("../model/usermodel");
const { validationResult } = require('express-validator');
let jwt = require('jsonwebtoken');
require('dotenv').config()

const newToken=(user)=>{
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
}

const register=async(req,res)=>{
 try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
     let user= await User.findOne({email:req.body.email}).lean().exec();

     if(user){
         return res.status(400).send("email already exists")
     }
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    const token =newToken(user);
    return res.status(201).send({user,token})

 } catch (error) {
    return res.status(500).send({message:error.message})
 }
}



const login=async(req,res)=>{
    try {
        const user= await User.findOne({email:req.body.email});

    if(!user){
        return res.status(400).send("Wrong email or password") 
    }
    const match=  user.checkpassword(req.body.password);
    if(!match){
        return res.status(400).send("Wrong email or password") 
    }
    const token =newToken(user);
    return res.status(201).send({token})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }

}

module.exports={register,login}