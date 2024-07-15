const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var {User,BorrowerRecord} = require('./schemas')

const mongoURI = 'mongodb+srv://admin:Nihar365@-management-sys.05ochgu.mongodb.net/?retryWrites=true&w=majority&appName=Lib-management-sys';


// Function to send email notification
async function sendEmailNoti(userEmail, bookid) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'librarian@gmail.com',
      pass: 'qwerty@1234'
    }
  });

  const mailOptions = {
    from: 'librarian@gmail.com',
    to: userEmail,
    subject: `Book Due Today - ${bookid}`,
    text: `This is a reminder that the book ${bookid} is due today. Please return it to the library by EOD.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Connecting to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to check for overdue books
async function checkDueBooks() {
  const today = new Date();

  // Find users with issued books
  const users = await BorrowRecord.find({borrowed: {$exists:true}});

  for (const user of users) {
    for (const book of BorrowerRecord.borrowed.bookid) {
      const dueDate = new Date(BorrowerRecord.borrowed.duedate);
      // const daysSinceIssue = Math.floor((today - issueDate) / (1000 * 60 * 60 * 24));

      if (today === dueDate) {
        await sendEmailNoti(user.email, BorrowerRecord.borrowed.bookid);
      }
    }
  }
}
//Running the checkDueBooks function periodically every hour
// setInterval(checkDueBooks, 3600000);
module.exports = {checkDueBooks,sendEmailNoti};
