const issuedBooksList = document.getElementById('issuedBooks');

// [
//   { title: ['Book Title 1','book2','book3'], user: 'User A', date: '01-07-2024' },
//   { title: ['Book Title 2'], user: 'User B', date: '02-07-2024' },
//   { title: ['Book Title 3'], user: 'User C', date: '03-07-2024' }
// ];

async function createBookEntry(user) {
  const li = document.createElement('li');
  li.className = 'book-item';

  const userDiv = document.createElement('div');
  userDiv.className = 'user';
  userDiv.textContent = `User: ${user.username}`;
  li.appendChild(userDiv);

  for(x of user.bookid){
    fetch('http://localhost:5001/getbook/'+`${x}`).then((res)=>{return res.json()}).then((book)=>{
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
        }else{
          book_details.remove();
        }
      });


      buttonsDiv.appendChild(rejectButton);
      rejectButton.addEventListener('click',async ()=>{
        await fetch('http://localhost:5001/issue/delete/'+`${user.username}`,{body:JSON.stringify({id:book.id}),method:"POST",headers: { 'Content-Type': 'application/json' }});
        if(li.childElementCount==1){
          li.remove();
        }else{
          book_details.remove();
        }
      });


      book_details.appendChild(nullDiv)
      book_details.appendChild(buttonsDiv);
      li.appendChild(book_details);
    });
  }
  return li;
}

fetch('http://localhost:5001/issue').then((res)=>{return res.json()}).then( (userList)=>{
  if (userList) {
    userList.forEach(async (user) => {
        const bookEntry =await createBookEntry(user);
        issuedBooksList.appendChild(bookEntry);
    });
  }

});
