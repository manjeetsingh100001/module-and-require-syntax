const express = require("express");

const Comment= require("../models/comment.models");
const router = express.Router();

router.post("",async(req,res)=>{
    try{
        const comments= await Comment.create(req.body);
        return res.status(200).send(comments)
    }catch(err){
        return res.status(500).send({message:"something went wrong"})
    }
})
module.exports = router;