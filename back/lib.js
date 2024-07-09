const express = require("express");
const jwt=require('jsonwebtoken')
var router = express.Router();
var { User, Book, BorrowerRecord} = require("./schemas");
const authenticateUser=require('./authenticationmiddleware');
//home endpoint
const bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))
router.get("/",authenticateUser, (req, res) => {
    if(req.session.accessToken){
        res.render('layouts/post-login',{welcomeUser:req.user.name})
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
router.get("/getbooks/getuniquegenre",async (req,res)=>{
    let data = await Book.distinct('genre');
    res.send(data);
});
router.get("/getbooks/getuniquedept",async (req,res)=>{
    let data = await Book.distinct('department');
    res.send(data);
}); 



module.exports = router;

