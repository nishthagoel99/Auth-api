var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var cookieParser=require('cookie-parser');
app.use(cookieParser());
var path=require('path');
var ejs=require('ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine','html');
app.set('views',path.join(__dirname,'/views'));
app.engine('html',ejs.renderFile);


var loginRoute=require('./api/routes/login');
app.use('/login',loginRoute);
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');
    next();
});

module.exports=app;