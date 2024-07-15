const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var {User,BorrowerRecord,Book} = require('./schemas')




// Function to send email notification
async function sendEmailNoti(userEmail, bookid,latefee) {
  let data=await Book.findById(bookid);
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'msnslibrary@outlook.com', 
      pass: 'qaz123wsx456', 
    },
  });
  let textMessage=(latefee===0)?`This is a reminder that the book ${data.title} is due today. Please return it to the library by EOD.`:`This is a reminder that the book ${data.title} is overdue.Your late fees is: ${latefee}. Please submit the book as well as the latefee at the earliest to prevent further charges`;
  let subjectMessage=(latefee===0)?`Book Due Today- ${data.title}`:`Book Overdue - ${data.title}`
  const mailOptions = {
    from: 'msnslibrary@outlook.com',
    to: userEmail,
    subject: subjectMessage,
    text: textMessage
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Connecting to MongoDB


// Function to check for overdue books 
async function checkDueBooks() {
  const today = new Date();

  // Find borrowers with issued books
  const borrowers = await BorrowerRecord.find({ borrowed: { $exists: true, $ne: [] } });
  // console.log(borrowers);
  for (let borrower of borrowers) {
     

    for (let borrowedBook of borrower.borrowed) {
      // const dueDate = new Date(borrowedBook.duedate);
      console.log(borrowedBook.duedate);
      const dueDate=Date.parse(borrowedBook.duedate)
      // console.log(borrowedBook.dueDate,today);
      if (today.getTime() >= dueDate) {
        // Find user's email
        const user = await User.findOne({ username: borrower.username });
        if (user && user.email) {
          let latefee=Math.max(0, Math.floor(((new Date()).getTime() - Date.parse(borrowedBook.duedate)) / (1000 * 60 * 60 * 24))) *100;
          await sendEmailNoti(user.email, borrowedBook.bookid,latefee);
          console.log(user.email)
        }
      }
    }
  }
}

module.exports = {checkDueBooks,sendEmailNoti};
