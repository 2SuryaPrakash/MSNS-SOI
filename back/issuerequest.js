const express = require("express");
var router = express.Router();
var {Issue} = require("./schemas");

const bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))
router.get('/issue',async(req,res)=>{
    let data=await Issue.find({bookid: {$ne: []}});
    res.send(data);
});
router.get('/issue/:username',async(req,res)=>{
    let data=await Issue.find({username:req.params.username});
    res.send(data);
});
router.post('/issue/:username',async (req,res)=>{
    if(req.body.books){
        for(book of req.body.books){
            try{
                await Issue.findOneAndUpdate({username:req.params.username},{ $push: {bookid:book} });
            }
            catch{
                console.log('error in inserting')
            }
        }
        
    }  
    res.send(req.body.id);
});
router.post('/issue/delete/:username',async (req,res)=>{
    await Issue.updateOne({username: req.params.username},{$pull: {bookid: req.body.id}});    
      res.send('');
});
router.get('/issue/deleteall/:username',async (req,res)=>{
    await Issue.updateOne({username: req.params.username},{bookid:[]});    
      res.send('');
});
module.exports=router;