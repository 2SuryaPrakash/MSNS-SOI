

const studentDetailsContainer = document.querySelector('.admin-student-data-student-details');
const input=document.querySelector('.admin-student-data-search-student-form input');
const select=document.querySelector('.admin-student-data-search-student-form select')
const submitButton=document.querySelector('.admin-student-data-search-student-form button')

submitButton.addEventListener('click',()=>{
    studentDetailsContainer.textContent='';
    let request={type:select.value}
    if(input.value){
        request.query=input.value;
    }
    fetch('http://localhost:5001/search/user',{body:JSON.stringify(request),method:"POST",headers: { 'Content-Type': 'application/json' }}).then((res)=>{return res.json()}).then((data)=>{
        data.forEach(student => {
            if(student.username!='admin'){
                    const studentCard = document.createElement('div');
                    studentCard.classList.add('admin-student-data-student-details-card');

                    const studentUserDetails=document.createElement('div');
                    studentUserDetails.classList.add('admin-student-data-student-details-card-user-details');
                
                    const studentName = document.createElement('div');
                    studentName.classList.add('admin-student-data-student-details-card-name');
                    studentName.innerHTML = `<span>Name: ${student.name}</span>`; // Replace 'name' with the appropriate key in your API data
                
                    const studentUsername = document.createElement('div');
                    studentUsername.classList.add('admin-student-data-student-details-card-username');
                    studentUsername.innerHTML = `<span>Username: ${student.username}</span>`; // Replace 'username' with the appropriate key in your API data
                
                    const studentBookList = document.createElement('div');
                    studentBookList.classList.add('admin-student-data-student-details-card-bookList');
                
                    const bookListTitle = document.createElement('div');
                    bookListTitle.classList.add('admin-student-data-student-details-card-bookList-title');
                    bookListTitle.textContent = 'Books Issued';
                
                    const bookList = document.createElement('div');
                    bookList.classList.add('admin-student-data-student-details-card-bookList-list');
                
                    fetch('http://localhost:5001/borrow/'+student.username).then((res)=>{return res.json()}).then((userBorrow)=>{
                        if (userBorrow.borrowed && userBorrow.borrowed.length > 0) {
                            userBorrow.borrowed.forEach(x => {
                                fetch('http://localhost:5001/getbook/'+x.bookid).then((res)=>{return res.json()}).then((book)=>{
                                    const bookItem = document.createElement('div');
                                    bookItem.textContent = book.title; 
                                    bookList.appendChild(bookItem);
                                });
                            
                            });
                        } else {
                            bookList.textContent = 'No Books Borrowed';
                        }
                    });
                    
                
                    studentBookList.appendChild(bookListTitle);
                    studentBookList.appendChild(bookList);
                

                    studentUserDetails.appendChild(studentName);
                    studentUserDetails.appendChild(studentUsername);

                    studentCard.appendChild(studentUserDetails);

                    studentCard.appendChild(studentBookList);
                
                    studentDetailsContainer.appendChild(studentCard);
                }
          });
    });
})

submitButton.click();


