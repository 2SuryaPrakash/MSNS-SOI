
const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://admin:Nihar365@-management-sys.05ochgu.mongodb.net/?retryWrites=true&w=majority&appName=Lib-management-sys";

mongoose.connect(mongoUri)
  .then(() => console.log("Successfully connected!"))
  .catch(err => console.error("Connection error:", err));

const db = mongoose.connection;

//schema creation

// Schema for User credentials
var UserSchema = mongoose.Schema({
	name: String,
	username: { type: String, unique: true },
	password: { type: String, required: true, unique: false, maxlength: 60 },
	email: { type: String, unique: true },
});

// Schema for Books stored in library
var BookSchema = mongoose.Schema({
	title: String,
    description: String,
    author: String,
    genre: String,
    department: String,
	count:Number,
	available: { type: Boolean, default: true }
}, { timestamps: true })

// Schema for borrowed records of each user
var bookAndDueDateSchema=mongoose.Schema({
	bookid:{ type: mongoose.ObjectId},
	duedate:{														// array of duedates
		type: Date,
		default: () => new Date(+new Date() + 20 * 24 * 60 * 60 * 1000),//You can borrow for 20 days 
		
	}
});
var borrowerRecordSchema = mongoose.Schema({
	username: String,
	borrowed: [bookAndDueDateSchema]
}, { timestamps: true })
var cartSchema = mongoose.Schema({
	username: String,
	bookid: [{ type: mongoose.ObjectId }],// array of book ids

}, { timestamps: true })
var pendingIssueSchema = mongoose.Schema({
	username: String,
	bookid: [{ type: mongoose.ObjectId  }],// array of book ids

}, { timestamps: true })
var pendingReturnSchema = mongoose.Schema({
	username: String,
	bookid: [{ type: mongoose.ObjectId}],// array of book ids

},  { timestamps: true })


var User = mongoose.model('User', UserSchema, 'user');
var Book = mongoose.model('Book', BookSchema, 'books');
var Cart= mongoose.model('Cart',cartSchema,'cart')
var Issue=mongoose.model('Issue',pendingIssueSchema,'issue');
var Return=mongoose.model('Return',pendingReturnSchema,'return')
var BorrowerRecord = mongoose.model('BorrowerRecord', 
									borrowerRecordSchema, 'borrowers');
// var ReturnRecord = mongoose.model('ReturnRecord', 
// 								ReturnRecordSchema, 'returnrecords');

module.exports = { db, User, Book, BorrowerRecord,Cart,Issue,Return};
