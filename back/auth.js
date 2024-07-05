require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
var router = express.Router();
var {User} = require('./schemas');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const bcrypt=require('bcrypt');


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))


router.get("/welcome",(req,res)=>{
  res.render('layouts/login-signup-page');
});

//Signup
router.post('/signup', async (req, res) => {
    //new user creation from request body data
    let user=await User.findOne({username:req.body.username});
    let useremail=await User.findOne({email:req.body.email});
    if(user){
      res.render('layouts/login-signup-page',{usernameCreate:"Username Taken!",containerState:"active"});
    }
    else{
      if(useremail){
        res.render('layouts/login-signup-page',{emailCreate:'Email Already Registered!',containerState:"active"});
      }
      else{
        if(!req.body.email.match(/^[\w]{9}@iitdh\.ac\.in$/)){
          res.render('layouts/login-signup-page',{emailCreate:'Email Does Not Belong to Organization(IIT-Dh)',containerState:"active"});
        }
        else{
          req.body.password=await bcrypt.hash(req.body.password,10);
        await User.create(req.body).then((user) => {
          console.log(user.username + " saved to user collection.");
          res.render('layouts/login-signup-page',{successMessage: true});
        }).catch((err)=>{res.render('index')});
        }
      }
    }
});



//Log in
router.post('/login',async (req, res) => {
    let user=await User.findOne({username:req.body.username});
    if(!user){
      res.render('layouts/login-signup-page',{usernameLogin:'Username Not Found!'});
    }
    else{
      if(!(await bcrypt.compare(req.body.password, user.password))){
        res.render('layouts/login-signup-page',{passwordLogin:'Incorrect password!'});
      }
      else{
        const accessToken=jwt.sign(req.body.username,process.env.ACCESS_TOKEN_SECRET);
        req.session.accessToken=accessToken;
        res.render('new',{title:'welcome'});

      }
    }
});

//Signing out the user.
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
      if (err) { return next(err); }
      res.redirect('layout/index');
  });
})
module.exports = router;












