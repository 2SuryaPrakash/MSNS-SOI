
const bookContainer = document.querySelector('.search-cart-display-bookDisplay')
const currentusername=document.querySelector('.currentusername')
const cartItemCounter=document.querySelector('.access-cart-button-count')
async function fetchCart() {
  try {
    const response = await fetch('http://localhost:5001/cart/'+currentusername.textContent); // Replace with your actual API endpoint
    const data = await response.json();

    if (data.bookid.length==0) {
      bookContainer.textContent = 'Try adding some books to the cart';
      cartItemCounter.textContent=0;
      return;
    }
    let c=0;
    for (const id of data.bookid) {
        if(id)
            {
                c+=1;
                createBookCell(id);
            }
    }
    cartItemCounter.textContent=c;
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

async function createBookCellNew(bookid) {
    fetch('http://localhost:5001/getbook/'+`${bookid}`).then((res)=>{return res.json()}).then((bookData)=>{
        fetch('http://localhost:5001/cart/'+`${currentusername.textContent}`,{body:JSON.stringify({id:bookid}),method:"POST",headers: { 'Content-Type': 'application/json' }}).then(()=>{
            
            let notifTitle=document.querySelector('#addToCart-book-snackbar span');
            notifTitle.textContent=bookData.title;

            cartItemCounter.textContent=Number(cartItemCounter.textContent)+1;
            const bookCell = document.createElement('div');
            bookCell.classList.add('search-cart-display-bookDisplay-card');

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('search-cart-display-bookDisplay-card-content');

            const idDiv = document.createElement('div');
            idDiv.textContent = bookData.id;
            idDiv.hidden = true;  

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('search-cart-display-bookDisplay-card-content-title');
            titleDiv.textContent = bookData.title; 

            const authorDiv = document.createElement('div');
            authorDiv.classList.add('search-cart-display-bookDisplay-card-content-author');
            authorDiv.textContent = bookData.author;

            contentDiv.appendChild(idDiv);
            contentDiv.appendChild(titleDiv);
            contentDiv.appendChild(authorDiv);

            const deleteDiv = document.createElement('div');
            deleteDiv.classList.add('search-cart-display-bookDisplay-card-delete');

            const deleteButton = document.createElement('button');
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa', 'fa-trash-o'); 

            deleteButton.appendChild(deleteIcon);
            deleteDiv.appendChild(deleteButton);
            deleteButton.addEventListener('click', async function() {
                const bookId = this.parentElement.parentElement.querySelector('[hidden]').textContent; 
                // await Cart.updateOne({ username: currentusername },{ $pull: { bookid: mongoose.Types.ObjectId(bookId) } });
                cartItemCounter.textContent=Number(cartItemCounter.textContent)-1;
                await fetch('http://localhost:5001/cart/delete/'+`${currentusername.textContent}`,{body:JSON.stringify({id:bookid}),method:"POST",headers: { 'Content-Type': 'application/json' }})
                this.parentElement.parentElement.remove();
            });

            bookCell.appendChild(contentDiv);
            bookCell.appendChild(deleteDiv);

            bookContainer.appendChild(bookCell);
        });
    });
   
  
}

async function createBookCell(bookid) {
    fetch('http://localhost:5001/getbook/'+`${bookid}`).then((res)=>{return res.json()}).then((bookData)=>{
        const bookCell = document.createElement('div');
            bookCell.classList.add('search-cart-display-bookDisplay-card');

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('search-cart-display-bookDisplay-card-content');

            const idDiv = document.createElement('div');
            idDiv.textContent = bookData.id;
            idDiv.hidden = true;  

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('search-cart-display-bookDisplay-card-content-title');
            titleDiv.textContent = bookData.title; 

            const authorDiv = document.createElement('div');
            authorDiv.classList.add('search-cart-display-bookDisplay-card-content-author');
            authorDiv.textContent = bookData.author;

            contentDiv.appendChild(idDiv);
            contentDiv.appendChild(titleDiv);
            contentDiv.appendChild(authorDiv);

            const deleteDiv = document.createElement('div');
            deleteDiv.classList.add('search-cart-display-bookDisplay-card-delete');

            const deleteButton = document.createElement('button');
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa', 'fa-trash-o'); 

            deleteButton.appendChild(deleteIcon);
            deleteDiv.appendChild(deleteButton);
            deleteButton.addEventListener('click', async function() {
                // const bookId = this.parentElement.parentElement.querySelector('[hidden]').textContent; 
                cartItemCounter.textContent=Number(cartItemCounter.textContent)-1;
                await fetch('http://localhost:5001/cart/delete/'+`${currentusername.textContent}`,{body:JSON.stringify({id:bookid}),method:"POST",headers: { 'Content-Type': 'application/json' }})
                this.parentElement.parentElement.remove();
            });

            bookCell.appendChild(contentDiv);
            bookCell.appendChild(deleteDiv);

            bookContainer.appendChild(bookCell);
    });
   
  
}
fetchCart();