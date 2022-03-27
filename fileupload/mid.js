const express=require("express");
const app=express();

   
app.get("/books/:name", loggerhelp(),(req,res)=>{

    console.log("books");
    //return res.send(req.params) this will also work
    req.name=req.params.name;
    return res.send({"bookName":req.name})
})
function loggerhelp(){
    return function (req,res,next){
        console.log(req.params);
       
req.name=req.params.name;
console.log(req.name);
        console.log("Fetching all books")
        next();
    }
}

// Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }
// To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

// app.get('/users/:userId/books/:bookId', (req, res) => {
//   res.send(req.params)
// })
    app.listen(5000,()=>{
        console.log("listening at port 5000")
    });