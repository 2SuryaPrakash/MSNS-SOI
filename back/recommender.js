
const { User, Book, BorrowerRecord } = require('./schemas'); 


const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: false
})) 


async function getRecommendedBooks(username){
  let uniqueGenres=new Set();
  let uniqueDepartments=new Set();
  const user =await BorrowerRecord.findOne({username:username});
  for(let book of user.borrowed){
    let bookData=await Book.findById(book.bookid);
    await uniqueGenres.add(bookData.genre);
    await uniqueDepartments.add(bookData.department);
  }
  const recommendations = await Book.find({
          $or: [
            { genre: { $in: Array.from(uniqueGenres) } },
            // { author: { $in: authors } },
            { department: { $in: Array.from(uniqueDepartments) } }
          ],
          _id: { $nin: user.borrowed.map(book => book.id) } // Excluding already borrowed books
        });
        console.log(recommendations.length)
        return recommendations;
  
}


router.get('/recommender/:username',async (req,res)=>{
    let data=await getRecommendedBooks(req.params.username);
    res.send(data);
});


module.exports=router;
