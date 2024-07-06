const express = require('express');
var router = express.Router();
var {User} = require('./schemas');
const bodyParser = require('body-parser');
const authenticateUser=require('./authenticationmiddleware');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))
router.use('/',authenticateUser);
router.get('/search',(req,res)=>{
    console.log(req.user);
    res.render('layouts/search');
});

module.exports=router;