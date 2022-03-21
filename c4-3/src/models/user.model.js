const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type : String, required : true},
    lastName : {type : String, required : false},
    user_id : {type : mongoose.Schema.Types.ObjectId, ref:"user", required : true},
    age : {type : Number, required : true},
    email : {type : email, required : true,unique:true},
    profileImages : {type : String, required : true},
},{
    timestamps : true,
    versionKey : false,
})


const User = mongoose.model("user", userSchema)

module.exports = User;