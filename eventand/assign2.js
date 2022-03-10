const express=require("express");
const app=express();

app.get("",(req, res) => {
    console.log("Hello")
      return res.send("Hello");
    });
   var bookobj={
       "book1":"spiderman",
       "book2":"harry potter",
       "book3":"chacha chaudhary",
       "book4":"two state"
   } 
app.get("/books",(req,res)=>{

    console.log("books");
    return res.send(bookobj)
})
    app.listen(5000,()=>{
        console.log("listening at port 5000")
    });