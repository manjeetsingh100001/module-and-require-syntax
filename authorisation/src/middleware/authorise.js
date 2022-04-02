const res = require("express/lib/response");



const authorise=(role)=>{
    return (req,res,next)=>{
        let user=req.user
        let permitted=false;
      role.map(role=>{
        if(user.role.includes(role)){
          permitted=true;
        }
      })
      if(permitted){
          return next();
      }else{
          res.status(401).send({message:"unauthorized access"});
      }
    }
}

module.exports=authorise;