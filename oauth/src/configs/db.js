const mongoose=require("mongoose");
// require('dotenv').config()

const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/OAuth")
 }



module.exports=connect