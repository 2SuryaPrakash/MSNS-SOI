const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const path = require('path');
var session = require('express-session');
const bodyParser = require('body-parser');
const schemas = require('./back/schemas');
var db = schemas.db;
const port = 3000;

// Importing routers
var authRouter = require('./back/auth');
var libraryRouter = require('./back/lib');
var postLoginRouter = require('./back/postlogin');
var cartRouter = require('./back/cart');
var borrowRouter = require('./back/borrow');
var issueRouter = require('./back/issuerequest');
var returnRouter = require('./back/returnrequest');
var adminRouter = require('./back/admin');
var recommenderRouter=require('./back/recommender');

// Importing email functions
const { checkDueBooks, sendEmailNoti } = require('./back/email');

const hbs = require('hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('isAvailable', function (value) {
  return value != 0;
});

app.use(express.static("./public"));

// configuring session
app.use(session({
  secret: '~fC4%qZ2j*b!_K',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    client: db.getClient(),
    dbName: 'test',
    collectionName: "sessions",
    stringify: false,
    autoRemove: "interval",
    autoRemoveInterval: 10 * 60
  })
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', authRouter);
app.use('/', libraryRouter);
app.use('/', postLoginRouter);
app.use('/', cartRouter);
app.use('/', borrowRouter);
app.use('/', adminRouter);
app.use('/', issueRouter);
app.use('/', returnRouter);
app.use('/',recommenderRouter);

app.get('*',(req,res)=>{
  res.render('layouts/error404');
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Schedule the checkDueBooks function to run periodically
setInterval(checkDueBooks, 3600000*24); // Runs every day


// sendEmailNoti('cs23bt072@iitdh.ac.in','udhebfijdbfj');

// server listening
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
