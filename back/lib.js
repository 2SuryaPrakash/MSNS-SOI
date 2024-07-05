const express = require("express");
const jwt=require('jsonwebtoken')
var router = express.Router();
var { User, Book, BorrowerRecord, ReturnRecord } = require("./schemas");
const { JsonWebTokenError } = require("jsonwebtoken");
const authenticateUser=require('./authenticationmiddleware');
//home endpoint
router.get("/", (req, res) => {
    // res.send("./public/index.html");
    res.render('layouts/index');
});

router.get("/getbooks",authenticateUser, async (req, res) => {
    const books = await Book.find({});
    res.send(books);
});





module.exports = router;

