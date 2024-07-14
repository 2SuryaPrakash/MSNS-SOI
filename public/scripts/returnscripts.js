const issuedBooksList = document.getElementById('returnedBooks');

async function createBookEntry(user) {
  const li = document.createElement('li');
  li.className = 'book-item';

  const userDiv = document.createElement('div');
  userDiv.className = 'user';
  userDiv.textContent = `User: ${user.username}`;
  li.appendChild(userDiv);

  for(let x of user.borrowed){  
    await fetch('http://localhost:5001/getbook/'+`${x.bookid}`).then((res)=>{return res.json()}).then((book)=>{
      
      const book_details=document.createElement('div');
      book_details.className='book-content';

      const nullDiv = document.createElement('div');
      nullDiv.className = 'null-container';
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';
      bookDiv.textContent = `Title: ${book.title}`;

      const countDiv = document.createElement('div');
      countDiv.className = 'count';
      countDiv.textContent = `Count: ${book.count}`;

      nullDiv.appendChild(bookDiv);
      nullDiv.appendChild(countDiv);

      const buttonsDiv=document.createElement('div');
      buttonsDiv.className='issue-buttons';

      const issueButton=document.createElement('button');
      issueButton.className='issue-buttons-acceptbutton';
      
      let accept=document.createElement('i');
      accept.className='fa fa-check';

      issueButton.appendChild(accept);

      const rejectButton=document.createElement('button');
      rejectButton.className='issue-buttons-rejectbutton';
      rejectButton.textContent='X';

      buttonsDiv.appendChild(issueButton);
      issueButton.addEventListener('click',async ()=>{
        await fetch('http://localhost:5001/return/delete/'+`${user.username}`,{body:JSON.stringify({id:x.bookid}),method:"POST",headers: { 'Content-Type': 'application/json' }});
        if(li.childElementCount==1){
          li.remove();
        }else{
          book_details.remove();
        }

        let snackbar=document.getElementById('returnRequest-book-snackbar');
              
        snackbar.className='showSnackbar';
    
        setTimeout(()=>{
            snackbar.className=snackbar.className.replace('showSnackbar','');
        },2000);
      });


      book_details.appendChild(nullDiv)
      book_details.appendChild(buttonsDiv);
      li.appendChild(book_details);
      issuedBooksList.appendChild(li);
    });
  }
  
}

fetch('http://localhost:5001/return').then((res)=>{return res.json()}).then( (userList)=>{
  if (userList) {
    userList.forEach(async (user) => {
        createBookEntry(user);
        
    });
  }

});




//    document.addEventListener('DOMContentLoaded', function() {
//   // Examples for issued and returned books

//   const returnedBooks = [
//       { title: 'Book Title 4', user: 'User D', date: '04-07-2024' },
//       { title: 'Book Title 5', user: 'User E', date: '05-07-2024' },
//       { title: 'Book Title 6', user: 'User F', date: '06-07-2024' }
//   ];

//   // Function to create a entry i.e. basically making the format to diplaty the books
//   function createBookEntry(book) {
//     const li = document.createElement('li');
//     li.className = 'book-item';
  
//     const userDiv = document.createElement('div');
//     userDiv.className = 'user';
//     userDiv.textContent = `User: ${book.user}`;
  
    
//     const book_details=document.createElement('div');
//     book_details.className='book-content';
  
//     const nullDiv = document.createElement('div');
//     nullDiv.className = 'null-container';
  
//     const bookDiv = document.createElement('div');
//     bookDiv.className = 'book';
//     bookDiv.textContent = `Title: ${book.title}`;
  
//     const dateDiv = document.createElement('div');
//     dateDiv.className = 'date';
//     dateDiv.textContent = `Date: ${book.date}`;
  
//     nullDiv.appendChild(bookDiv);
//     nullDiv.appendChild(dateDiv);
  
  
//     const buttonsDiv=document.createElement('div');
//     buttonsDiv.className='issue-buttons';
  
//     const issueButton=document.createElement('button');
//     issueButton.className='issue-buttons-acceptbutton';
    
//     let accept=document.createElement('i');
//     accept.className='fa fa-check';
  
//     issueButton.appendChild(accept);
  
//     const rejectButton=document.createElement('button');
//     rejectButton.className='issue-buttons-rejectbutton';
    
//     rejectButton.textContent='X';
  
//     buttonsDiv.appendChild(issueButton);
//     buttonsDiv.appendChild(rejectButton);
  
//     book_details.appendChild(nullDiv)
//     book_details.appendChild(buttonsDiv);
  
    
  
//     li.appendChild(userDiv);
//     li.appendChild(book_details);
  
//     return li;
//   }

//   // to showcase by traversing the returned book list
//   const returnedBooksList = document.getElementById('returnedBooks');
//   if (returnedBooksList) {
//       returnedBooks.forEach(book => {
//           const bookEntry = createBookEntry(book);
//           returnedBooksList.appendChild(bookEntry);
//       });
//   }
// });