const express = require('express');
var router = express.Router();
var {User,Book} = require('./schemas');
const bodyParser = require('body-parser');
const authenticateUser=require('./authenticationmiddleware');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))
// router.use('/',authenticateUser);
router.get('/search',authenticateUser,async (req,res)=>{
    let data=await Book.find({});
    res.render('layouts/search',{cellsData:data,currentusername:req.user.username});
});
router.get('/home',authenticateUser,(req,res)=>{
    res.render('layouts/post-login',{welcomeUser:req.user.name});
});
router.post('/search',authenticateUser,async (req,res)=>{
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
    res.render('layouts/search',{cellsData:data,currentusername:req.user.username,sortState:sort==1?'':'selected',deptState:req.body.department?`value="${req.body.department}"`:'',genreState:req.body.genre?`value="${req.body.genre}"`:'',searchbyState:sortby=='title' ? 'selected':''});
    //fix it so that it keeps values in the form even if you rerender
    
});
router.post('/search/user',async (req,res)=>{
    if(req.body.type=='name'){
        if(req.body.query){
            let data=await User.find({name:{$regex: req.body.query,$options:'i'}});
            res.send(data);
        }else{
            let data=await User.find({});
            res.send(data);
        }
        
    }else if(req.body.type=='username'){
        if(req.body.query){
            let data=await User.find({username:{$regex: req.body.query,$options:'i'}});
            res.send(data);
        }else{
            let data=await User.find({});
            res.send(data);
        }  
    }
    
    
})
router.get('/dashboard',authenticateUser,(req,res)=>{
    res.render('layouts/dashboard',{username:req.user.username,name:req.user.name,email:req.user.email});
});

module.exports=router;