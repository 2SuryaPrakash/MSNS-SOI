const express = require("express");
var router = express.Router();
var {Return,Book} = require("./schemas");

const bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false   
}))
router.get('/return',async(req,res)=>{
    let data=await Return.find({borrowed: {$ne: []}});
    res.send(data);
}); 
router.get('/return/:username',async(req,res)=>{
    let data=await Return.findOne({username:req.params.username});
    res.send(data);
});
router.post('/return/:username',async (req,res)=>{
    if(req.body.books){
        for(book of req.body.books){
            try{
                await Return.findOneAndUpdate({username:req.params.username},{ $push: {borrowed:book.borrowed} });

            }
            catch{
                console.log('error in inserting')
            }
        }
        
    }
    res.send(req.body.id);
});
router.post('/return/delete/:username',async (req,res)=>{
    await Return.updateOne({username: req.params.username},{$pull: {borrowed:{bookid: req.body.id}}});    
    await Book.findByIdAndUpdate(req.body.id,{$inc: { count: 1 }});
    res.send('');
});
router.get('/return/deleteall/:username',async (req,res)=>{
    await Return.updateOne({username: req.params.username},{borrowed:[]});    
      res.send('');
});
module.exports=router;