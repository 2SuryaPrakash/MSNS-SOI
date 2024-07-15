
const explorePageDisplay = document.querySelector('.explore-page-display');
const showMoreButton=document.querySelector('.explore-page-display-showMore-button button');
const showMoreButtonDiv=document.querySelector('.explore-page-display-showMore-button')
const usernamecontainer =document.querySelector(".welcome-user-username");


let itemsToShow = 5;


async function displayBooks(start, end,username) {
    document.querySelectorAll('.explore-page-book').forEach(x=>{
        x.remove();
    }); 
    const response = await fetch('http://localhost:5001/recommender/'+username);
    const data = await response.json();
    if(data.length==0){
        explorePageDisplay.innerHTML='Borrow books to get personalized recommendations';
        return;
    }
  for (let i = start; i < end; i++) {
    const book = data[i];
    const bookElement = document.createElement('a');
    bookElement.classList.add('explore-page-book');
    bookElement.href = 'http://localhost:5001/searchbyid/'+book._id; 
    console.log(book._id,username);
    const bookContents = document.createElement('div');
    bookContents.classList.add('explore-page-book-contents');

    const bookTitle = document.createElement('div');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;



    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = book.author;

    bookContents.appendChild(bookTitle);
    bookContents.appendChild(bookAuthor);
    bookElement.appendChild(bookContents);

    explorePageDisplay.insertBefore(bookElement,showMoreButtonDiv);
  }
}

// Initial display
displayBooks(0, itemsToShow,usernamecontainer.textContent);
console.log(usernamecontainer.textContent);

// Show more button click handler
showMoreButton.addEventListener('click', () => {
  itemsToShow += 5; // Increase the number of items to show by 5
  displayBooks(0, itemsToShow,usernamecontainer.textContent);

  // Hide the button if all books are displayed
  if (itemsToShow >= data.length) {
    showMoreButton.style.display = 'none';
  }
});
// fetchAndRenderBooks();