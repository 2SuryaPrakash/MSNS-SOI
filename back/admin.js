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

    
router.get('/admin/updatebook',async (req,res)=>{  
    let data=await Book.find({});
    res.render('layouts/admin-updateBook',{cellsData:data});
});
router.post('/admin/updatebook',async (req,res)=>{
    if(req.body){
        try{
            await Book.findByIdAndUpdate(req.body.id,{title:req.body.title,description:req.body.description,author:req.body.author,genre:req.body.genre,department:req.body.department,count:req.body.count});
            res.send({status:'success'});
        }catch{
            res.send({status:'fail'});
        }
    }
    else{
        res.send({status:'fail'});
    }
});


router.get('/admin/issuebook',(req,res)=>{
    res.render('layouts/admin-issueRequests');
});
  
router.get('/admin/returnbook',(req,res)=>{
    res.render('layouts/admin-returnRequests');
});

router.get('/admin/studentdata',(req,res)=>{
    res.render('layouts/admin-studentData');
});

router.post('/admin/search',authenticateUser,async (req,res)=>{
    let query={};
    let sort=null;
    let sortby='';
    
        // const escapedInput = req.body.query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if(req.body.query){
        if(req.body.searchby=="title"){
        query.title={$regex: req.body.query,$options:'i'}
        sortby='title';
        }
        else{
            query.author={$regex: req.body.query,$options:'i'}
            sortby='author';
        }
    }
    if(req.body.sort==1){
        sort=1;
    }else{
        sort=-1;
    }
    if(req.body.department){
        query.department=req.body.department
    }
    if(req.body.genre){
        query.genre=req.body.genre
    }
    let data =await Book.find(query).sort({title:sort});
    res.render('layouts/admin-updateBook',{cellsData:data,currentusername:req.user.username,sortState:sort==1?'':'selected',deptState:req.body.department?`value="${req.body.department}"`:'',genreState:req.body.genre?`value="${req.body.genre}"`:'',searchbyState:sortby=='title' ? 'selected':''});
    //fix it so that it keeps values in the form even if you rerender
    
});
module.exports=router;