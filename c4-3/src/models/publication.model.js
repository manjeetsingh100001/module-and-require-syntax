const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
    name: {type : String, required : true},
    //ref to book
    book_id : {type : mongoose.Schema.Types.ObjectId, ref:"book", required : true},
   
   
},{
    timestamps : true,
    versionKey : false,
})


const Publication = mongoose.model("publication", pubSchema)

module.exports = Publication;