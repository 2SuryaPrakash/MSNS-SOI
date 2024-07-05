require('dotenv').config();
const jwt = require('jsonwebtoken');
function authenticateUser(req,res,next){
    if(!req.session.accessToken){
      res.render('layouts/login-signup-page',{invalidLogin:true});
    }
    else{
        jwt.verify(req.session.accessToken,process.env.ACCESS_TOKEN_SECRET,async (err,usern)=>{
            if(err){
              res.render('layouts/login-signup-page',{invalidLogin:true});
            }
            next();
          });
    }
}
module.exports= authenticateUser;