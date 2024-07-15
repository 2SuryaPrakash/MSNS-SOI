const usernamecontainer=document.querySelector('.dashboard-avatar-username')

//for issue requests
const parentContainer = document.querySelector('.dashboard-pending-issue-requests-bookList');
parentContainer.textContent='';
//bookData,bookid,username
function createBookCardPendingIssue(id,username) {
    fetch('http://localhost:5001/getbook/'+id).then((res)=>{return res.json()}).then((bookData)=>{
        const bookCard = document.createElement('div');
        bookCard.classList.add('dashboard-pending-issue-requests-bookList-bookCard');

        const bookName = document.createElement('div');
        bookName.classList.add('dashboard-pending-issue-requests-bookCard-bookName');
        bookName.textContent = bookData.title || 'Book Name';
            
        const cancelButton = document.createElement('div');
        cancelButton.classList.add('dashboard-pending-issue-requests-bookCard-cancelButton');

        const cancelButtonElement = document.createElement('button');
        cancelButtonElement.classList.add('dashboard-pending-issue-requests-bookCard-cancelButton-button');
        cancelButtonElement.textContent = 'Cancel';
        cancelButtonElement.addEventListener('click',async ()=>{
            await fetch('http://localhost:5001/issue/delete/'+username,{body:JSON.stringify({id:id}),method:"POST",headers: { 'Content-Type': 'application/json' }})
            bookCard.remove();
        });

        cancelButton.appendChild(cancelButtonElement);
        bookCard.appendChild(bookName);
        bookCard.appendChild(cancelButton);

        

        
        parentContainer.appendChild(bookCard);
    });
    
}
function fetchPendingIssue(){
    fetch('http://localhost:5001/issue/'+`${usernamecontainer.textContent}`).then((res)=>{return res.json()}).then(async (userissues)=>{
        for(id of userissues.bookid){
            await createBookCardPendingIssue(id,usernamecontainer.textContent);
        }
        
    });
}
fetchPendingIssue();
//done for issue requests


//for borrowed books
const parentContainer2 = document.querySelector('.dashboard-books-history-issued');
parentContainer2.textContent='';


function createBookCardBorrowed(book,username) {
    fetch('http://localhost:5001/getbook/'+book.bookid).then((res)=>{return res.json()}).then((bookData)=>{
        const bookCard = document.createElement('div');
        bookCard.classList.add('dashboard-books-history-issued-bookCard');

        const bookName = document.createElement('div');
        bookName.classList.add('dashboard-books-history-issued-bookCard-bookName');
        bookName.textContent = bookData.title || 'Book Name'; 

        const returnDate = document.createElement('time');
        returnDate.classList.add('dashboard-books-history-issued-bookCard-returnDate');
        returnDate.textContent = 'Return By: '+book.duedate || ''; 

        const lateFeeContainer = document.createElement('div');
        lateFeeContainer.classList.add('dashboard-books-history-issued-bookCard-lateFee');
        lateFeeContainer.textContent = 'Late Fee - ₹ ';

        const lateFeeAmount = document.createElement('span');
        lateFeeAmount.classList.add('dashboard-books-history-issued-bookCard-lateFee-amount');
        lateFeeAmount.textContent = Math.max(0, Math.floor(((new Date()).getTime() - Date.parse(book.duedate)) / (1000 * 60 * 60 * 24))) *100; //100 rupee per day

        lateFeeContainer.appendChild(lateFeeAmount);

        const returnButton = document.createElement('div');
        returnButton.classList.add('dashboard-books-history-issued-bookCard-returnButton');

        const returnButtonElement = document.createElement('button');
        returnButtonElement.classList.add('dashboard-books-history-issued-bookCard-returnButton-button');
        returnButtonElement.textContent = 'Return';
        returnButton.addEventListener('click',async ()=>{
                await fetch('http://localhost:5001/return/'+username,{body:JSON.stringify({books:[{borrowed:{bookid:book.bookid,duedate:book.duedate}}]}),method:"POST",headers: { 'Content-Type': 'application/json' }});
                await fetch('http://localhost:5001/borrow/delete/'+username,{body:JSON.stringify({id:book.bookid}),method:"POST",headers: { 'Content-Type': 'application/json' }});

                //remove book from the list.

                await bookCard.remove(); 
                parentContainer3.textContent='';
                await fetchPendingReturn(); 


                //Code for snackbar that pops up whenever return button is clicked.
                let snackbarBookTitle=document.querySelector('#return-book-snackbar span');
                snackbarBookTitle.textContent=bookName.textContent;
                let snackbar=document.getElementById('return-book-snackbar');
            
                snackbar.className='showSnackbar';


                setTimeout(()=>{
                    snackbar.className=snackbar.className.replace('showSnackbar','');
                },1800);

                
            });

        returnButton.appendChild(returnButtonElement);
    

        bookCard.appendChild(bookName);
        bookCard.appendChild(returnDate);
        bookCard.appendChild(lateFeeContainer);
        bookCard.appendChild(returnButton);

        

        parentContainer2.appendChild(bookCard);
    });
  
}
function fetchPendingBorrow(){
    fetch('http://localhost:5001/borrow/'+`${usernamecontainer.textContent}`).then((res)=>{return res.json()}).then(async (userborrow)=>{
        for(book of userborrow.borrowed){
            await createBookCardBorrowed(book,usernamecontainer.textContent);
        }
        
    });
}
fetchPendingBorrow();
//done for borrow

//for return requests
const parentContainer3 = document.querySelector('.dashboard-pending-return-requests-bookList');
parentContainer3.textContent='';

// Function to create a single book card element
function createBookCardPendingReturn(book,username) {
    fetch('http://localhost:5001/getbook/'+book.bookid).then((res)=>{return res.json()}).then((bookData)=>{
        const bookCard = document.createElement('div');
        bookCard.classList.add('dashboard-pending-return-requests-bookList-bookCard');

        const bookName = document.createElement('div');
        bookName.classList.add('dashboard-pending-return-requests-bookCard-bookName');
        bookName.textContent = bookData.title || 'Book Name'; 
        
        const lateFeeContainer = document.createElement('div');
        lateFeeContainer.classList.add('dashboard-books-history-issued-bookCard-lateFee');
        lateFeeContainer.textContent = 'Late Fee - ₹ ';
        const lateFeeAmount = document.createElement('span');
        lateFeeAmount.classList.add('dashboard-books-history-issued-bookCard-lateFee-amount');
        lateFeeAmount.textContent = Math.max(0, Math.floor(((new Date()).getTime() - Date.parse(book.duedate)) / (1000 * 60 * 60 * 24))) *100; //100 rupee per day

        lateFeeContainer.appendChild(lateFeeAmount);

        const bookStatus = document.createElement('div');
        bookStatus.classList.add('dashboard-pending-return-requests-bookCard-bookName');
        bookStatus.textContent = 'Please approach the librarian to return this book.'; 
        bookCard.appendChild(bookName);
        bookCard.appendChild(lateFeeContainer);
        bookCard.appendChild(bookStatus);
        
        
        parentContainer3.appendChild(bookCard);
        
    });
  
}
function fetchPendingReturn(){
    
    fetch('http://localhost:5001/return/'+`${usernamecontainer.textContent}`).then((res)=>{return res.json()}).then(async (userReturn)=>{
        for(book of userReturn.borrowed){
            await createBookCardPendingReturn(book,usernamecontainer.textContent);
        }
    });
}
fetchPendingReturn();

setInterval(()=>{
    location.reload();
},60000);
  
  
  
  
  
  
  
  
  

