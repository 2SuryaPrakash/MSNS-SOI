const express = require("express");
var router = express.Router();
var {Return} = require("./schemas");

const bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))

router.get('return/:username',async(req,res)=>{
    let data=await Return.find({username:req.params.username});
    res.send(data);
});
router.post('/return/:username',async (req,res)=>{
    if(req.body.books){
        for(book of req.body.books){
            try{
                await Return.findOneAndUpdate({username:req.params.username},{ $push: {bookid:book} });
            }
            catch{
                console.log('error in inserting')
            }
        }
        
    }
    res.send(req.body.id);
});
router.post('/return/delete/:username',async (req,res)=>{
    await Return.updateOne({username: req.params.username},{$pull: {bookid: req.body.id}});    
      res.send('');
});
router.get('/return/deleteall/:username',async (req,res)=>{
    await Return.updateOne({username: req.params.username},{bookid:[]});    
      res.send('');
});
module.exports=router;