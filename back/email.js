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

  // Find borrowers with issued books
  const borrowers = await BorrowerRecord.find({ borrowed: { $exists: true, $ne: [] } });

  for (const borrower of borrowers) {
    for (const borrowedBook of borrower.borrowed) {
      const dueDate = new Date(borrowedBook.duedate);
      if (today === dueDate) {
        // Find user's email
        const user = await User.findOne({ username: borrower.username });
        if (user && user.email) {
          await sendEmailNoti(user.email, borrowedBook.bookid);
        }
      }
    }
  }
}
//Running the checkDueBooks function periodically every hour
// setInterval(checkDueBooks, 3600000);
module.exports = {checkDueBooks,sendEmailNoti};
