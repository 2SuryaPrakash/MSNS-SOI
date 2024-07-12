const issuedBooksList = document.getElementById('issuedBooks');

async function createBookEntry(user) {
  const li = document.createElement('li');
  li.className = 'book-item';

  const userDiv = document.createElement('div');
  userDiv.className = 'user';
  userDiv.textContent = `User: ${user.username}`;
  li.appendChild(userDiv);

  for(let x of user.bookid){  
    await fetch('http://localhost:5001/getbook/'+`${x}`).then((res)=>{return res.json()}).then((book)=>{
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
        await fetch('http://localhost:5001/borrow/'+`${user.username}`,{body:JSON.stringify({books:[x]}),method:"POST",headers: { 'Content-Type': 'application/json' }});
        await fetch('http://localhost:5001/issue/delete/'+`${user.username}`,{body:JSON.stringify({id:x}),method:"POST",headers: { 'Content-Type': 'application/json' }});
        if(li.childElementCount==1){
          li.remove();
          console.log(li.childElementCount);
        }else{
          book_details.remove();
        }
      });


      buttonsDiv.appendChild(rejectButton);
      rejectButton.addEventListener('click',async ()=>{
        await fetch('http://localhost:5001/issue/delete/'+`${user.username}`,{body:JSON.stringify({id:x}),method:"POST",headers: { 'Content-Type': 'application/json' }});
        if(li.childElementCount==1){
          li.remove();
          
        }else{
          book_details.remove();
        }
      
      
      });


      book_details.appendChild(nullDiv)
      book_details.appendChild(buttonsDiv);
      li.appendChild(book_details);
      issuedBooksList.appendChild(li);
    });
  }
  
}

fetch('http://localhost:5001/issue').then((res)=>{return res.json()}).then( (userList)=>{
  if (userList) {
    userList.forEach(async (user) => {
         createBookEntry(user);
        
    });
  }

});
