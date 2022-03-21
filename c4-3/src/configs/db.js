const mongoose = require("mongoose");
const connect = ()=>{
    return mongoose.connect("mongodb+srv://manjeetdb:givemedatabase@cluster0.k9poz.mongodb.net/booksystem?retryWrites=true&w=majority"
    );
}
module.exports=connect;