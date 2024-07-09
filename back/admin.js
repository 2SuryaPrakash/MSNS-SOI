const express = require("express");
var router = express.Router();
var { User, Book, BorrowerRecord, ReturnRecord, Cart,Issue,Borrow} = require("./schemas");
const bodyParser = require('body-parser');
const authenticateUser=require('./authenticationmiddleware');
const jwt = require('jsonwebtoken');

router.use('/',authenticateUser);
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))
router.get('/admin/',(req,res)=>{
    if(req.session.accessToken){
        jwt.verify(req.session.accessToken,process.env.ACCESS_TOKEN_SECRET,async (err,usern)=>{
            if(err){
              res.render('layouts/login-signup-page',{invalidLogin:true});
            }
            let user=await User.findOne({username:usern})
            if(user.username=='admin'){
                res.render('layouts/admin',{welcomeUser:user.name})
            }else{
                res.render('layouts/login-signup-page',{invalidLogin:true});  
            }
            
          });
        
    }else
    {res.render('layouts/login-signup-page',{invalidLogin:true});  }
});
router.get('/admin/addbook',(req,res)=>{
    res.render('layouts/admin-addBook');
});
router.post('/admin/addbook',async (req,res)=>{
    console.log(req.body);
    if(!req.body.title||!req.body.author||!req.body.genre||!req.body.department||!req.body.count){
        res.send({status:'fail'});
    }
    else{
        await Book.create(req.body);
        res.send({status:'success'});

    }
});
module.exports=router;