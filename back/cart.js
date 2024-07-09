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

router.get('/cart/:username',async (req,res)=>{
    let cartdata=await Cart.findOne({username:req.params.username});
    res.send(cartdata);
});
router.post('/cart/:username',async (req,res)=>{
    try{
        await Cart.findOneAndUpdate({username:req.params.username},{$push: {bookid: req.body.id}});

    }
    catch{
        console.log('issue in inserting to cart')
    }
    res.send(req.body.id);
});
router.post('/cart/delete/:username',async (req,res)=>{
    await Cart.updateOne({username: req.params.username},{$pull: {bookid: req.body.id}});    
      res.send('');
});
router.get('/cart/deleteall/:username',async (req,res)=>{
    await Cart.updateOne({username: req.params.username},{bookid:[]});    
      res.send('');
});
module.exports = router;