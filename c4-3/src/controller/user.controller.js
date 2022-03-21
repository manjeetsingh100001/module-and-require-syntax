const express = require("express");

const User = require("../models/user.models");
const router = express.Router();

router.post("",async(req,res)=>{
    try{
        const users= await User.create(req.body);
        return res.status(200).send(users)
    }catch(err){
        return res.status(500).send({message:"something went wrong"})
    }
})
module.exports = router;