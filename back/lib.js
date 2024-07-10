const express = require("express");
var router = express.Router();
var { User,Book} = require("./schemas");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authenticateUser=require('./authenticationmiddleware');
//home endpoint
const bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))
router.get("/", (req, res) => {
    if(req.session.accessToken){
        jwt.verify(req.session.accessToken,process.env.ACCESS_TOKEN_SECRET,async (err,usern)=>{
            if(err){
              res.render('layouts/login-signup-page',{invalidLogin:true});
            }
            let user=await User.findOne({username:usern})
            if(user.username=='admin'){
                res.render('layouts/admin',{welcomeUser:user.name})
            }else{
                res.render('layouts/post-login',{welcomeUser:user.name})
            }
            
          });
        
    }else
    {res.render('layouts/index');}
//implement refresh tokens
});

router.get("/getbooks",authenticateUser, async (req, res) => {
    const books = await Book.find({});
    res.send(books);
});
router.get("/getbook/:id",async (req,res)=>{
    if(req.params.id){
        const book=await Book.findById(req.params.id);
        res.send(book);
    }
    else{
        res.send('');
    }
    
});  
router.get("/getbooks/getuniquegenre",authenticateUser,async (req,res)=>{
    let data = await Book.distinct('genre');
    res.send(data);
});
router.get("/getbooks/getuniquedept",authenticateUser,async (req,res)=>{
    let data = await Book.distinct('department');
    res.send(data);
}); 

router.get('/deletebook/:id',authenticateUser,async(req,res)=>{
    if(req.user.username=='admin'){
        await Book.findByIdAndDelete(req.params.id);
        res.send('');
    }else{
        res.render('layouts/login-signup-page',{invalidLogin:true});
    }
});

module.exports = router;

