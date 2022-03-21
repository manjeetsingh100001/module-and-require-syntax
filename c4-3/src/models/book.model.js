const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    likes: {type : String, required : true},
    coverimage: {type : String, required : false},
    //ref
    user_id : {type : mongoose.Schema.Types.ObjectId, ref:"user", required : true},
    content: {type : String, required : true},
   
},{
    timestamps : true,
    versionKey : false,
})


const Book = mongoose.model("book", bookSchema)

module.exports = Book;