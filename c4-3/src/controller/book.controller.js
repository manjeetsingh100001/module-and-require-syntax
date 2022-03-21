const express = require("express");

const Book = require("../models/book.models");
const router = express.Router();

router.post("",async(req,res)=>{
    try{
        const bookss= await Book.create(req.body);
        return res.status(200).send(bookss)
    }catch(err){
        return res.status(500).send({message:"something went wrong"})
    }
})
module.exports = router;