const express = require('express');
const app = express();
require('dotenv').config();
const mongoose=require('mongoose')
const MongoStore = require("connect-mongo");
const path=require('path')
var session = require('express-session');
const bodyParser = require('body-parser');
const schemas=require('./back/schemas');
var db=schemas.db;
const port = 5001;
var authRouter = require('./back/auth');
var libraryRouter = require('./back/lib');
var postLoginRouter=require('./back/postlogin')
var cartRouter=require('./back/cart')
var borrowRouter=require('./back/borrow')
const hbs= require('hbs')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');


app.use(express.static("./public"));
// configuring session
app.use(session({
	secret: '~fC4%qZ2j*b!_K',
	resave: false,
	saveUninitialized: true,
	// cookie: { maxAge: 3600000 },
	store: MongoStore.create({
		client: db.getClient(),
		dbName: 'test',
		collectionName: "sessions",
		stringify: false,
		autoRemove: "interval",
		autoRemoveInterval: 10*60
	})
}));
// mongoose.connect('mongodb+srv://admin:Nihar365@lib-management-sys.05ochgu.mongodb.net/?retryWrites=true&w=majority&appName=Lib-management-sys')
// configuring bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use('/', authRouter);
app.use('/', libraryRouter);
app.use('/',postLoginRouter);
app.use('/',cartRouter);
app.use('/',borrowRouter);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Internal Server Error');
  });

//server listening
app.listen(port, () => {
	console.log(`server started on ${port}`);
});
