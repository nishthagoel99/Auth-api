var con=require('../models/user');
var checkAuth=require('../middleware/checkauth');
var express=require('express');
var router=express.Router();
var ejs=require('ejs');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');

router.post('/',function(req,res){
    
    var name=req.body.name;
    var password=req.body.password;
    
    con.query('SELECT * FROM login WHERE Name=?',name,function(error,result){
        if(error){
            res.status(404).json({message:'error3'});
        }else{
            if(result.length>0){
                bcrypt.compare(password,result[0].HashedPass,function(err,result1){
                    if(err){
                        res.status(404).json({message:'error2'});
                    }else{
                        if(result1){
                            if(result[0].Name=='Nish'){
                                jwt.sign({
                                    name:result[0].Name,
                                    count:result[0].count
                                },process.env.JWT_ADMINKEY,
                                    {expiresIn:'2h'}
                                ,function(err,token){
                                    if(err){
                                        res.status(404).json({message:'error in token creation'});
                                    }else{
                                     
                                       // res.redirect('/display');
                                       // localStorage.setItem('token',token)
                                    //   res.cookie('auth',token);        
                                        res.status(200).json({message:'Success admin login',token:token});
                                    }
                                });
                            }else{
                                jwt.sign({
                                    name:result[0].Name,
                                    count:result[0].count
                                },process.env.JWT_USERKEY,function(err,token){
                                    if(err){
                                        res.status(404).json({message:'error in token creation'});
                                    }else{
                                        res.cookie('auth',token);        
                                        res.status(200).json({message:'Success user login',token:token});
                                    }
                                });
                            }  
                        }else{
                            res.status(300).json({message:'password incorrect',token:'null'});
                        }
                    }
                });
            }else{
                res.status(300).json({message:'No user with that name',token:'null'});
            }
        }
    });
});

router.get('/display',checkAuth,function(req,res){
    console.log('inside display');
           con.query('SELECT Name,Password FROM login',function(error,rows,fields){
            if(error) throw error;
            else{
               var data=JSON.stringify(rows);
              // console.log(data);
               res.status(200).json({message:'auth success',data:data});
               // res.render(__dirname+'/views/datasc.html',{data:rows});
            }
           
        });
    }); 

module.exports=router;