const Post=require("../model/postmodel");
const express=require("express");
const app=express();
const  authenticate=require("../middleware/authenticate")
const authorise=require("../middleware/authorise")

app.post("",authenticate,async(req,res)=>{
    try {
        req.body.userId=req.user._id
        const post=Post.create(req.body)
        return res.status(201).send(post)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})
app.get("",authenticate,async(req,res)=>{
    try {
        const post=Post.find().lean().exec();
        return res.status(201).send(post)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})
app.patch("/:id",authenticate,authorise(["seller","admin"]),async(req,res)=>{
    try {
        const post=Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(201).send(post)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})
app.delete("/:id",authenticate,authorise(["seller","admin"]),async(req,res)=>{
    try {
        const post=Post.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(post)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

module.exports=app;