var jwt=require('jsonwebtoken');
console.log('came in checkauth');
module.exports= function(req,res,next){
    console.log('c');
   // const token=localStorage.getItem('token');
    //console.log(token);
   const token=req.body.token;
    //const token=req.headers.authorization;
   // var token=req.cookies.auth;
    console.log(token);
  jwt.verify(token,process.env.JWT_ADMINKEY,function(error,result){
        if(error) {
            console.log('auth unsucess');
            res.status(300).json({message:'auth unsuccessful'});
        }
        else{
            console.log('auth success');
          //  res.status(200).json({message:'auth sucessful',token:result});
            next();
        }
    });
};