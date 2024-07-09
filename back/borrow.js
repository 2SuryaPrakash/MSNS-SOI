const express = require("express");
var router = express.Router();
var { User, Book, BorrowerRecord, ReturnRecord, Cart} = require("./schemas");
const bodyParser = require('body-parser');
const authenticateUser=require('./authenticationmiddleware');
router.use('/',authenticateUser);
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
}))
router.get('borrow/:username',async(req,res)=>{
    let data=await BorrowerRecord.find({username:req.params.username});
    res.send(data);
});
router.post('/borrow/:username',async (req,res)=>{
    if(req.body.books){
        for(book of req.body.books){
            try{
                await BorrowerRecord.findOneAndUpdate({username:req.params.username},{ $push: { borrowed:{bookid:book}  } });
            }
            catch{
                console.log('error in inserting')
            }
        }
        
    }
    console.log(req.body.books)
    res.send('');
});

module.exports = router;