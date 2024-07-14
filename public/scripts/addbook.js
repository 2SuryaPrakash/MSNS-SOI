const submitButton=document.querySelector('#submit')
submitButton.addEventListener('click',()=>{
    
    const fieldElements=document.querySelectorAll('form input');
    console.log(fieldElements);
    let newBook={
    title:fieldElements[0].value,
    description:fieldElements[1].value,
    author:fieldElements[2].value,
    genre:fieldElements[3].value,
    department:fieldElements[4].value,
    count:fieldElements[5].value
}
    fetch('http://localhost:5001/admin/addbook',{body:JSON.stringify(newBook),method:"POST",headers: { 'Content-Type': 'application/json' }}).then((res)=>{return res.json()})
    .then((response)=>{
        if(response.status=='fail'){
            //notification
            let showSnackbar=document.getElementById('add-book-warning-snackbar');
        

            showSnackbar.className='showAddBookWarningSnackbar';

            setTimeout(
                ()=>{
                    showSnackbar.className=showSnackbar.className.replace('showAddBookWarningSnackbar','');
                },3000
            )
        }else{
            // notification
            //enable admin addboks

            let showSnackbar=document.getElementById('add-book-snackbar');
            let bookname=document.querySelector('#add-book-snackbar span');

            const formElements=document.querySelectorAll('form input');

            bookname.textContent=formElements[0].value;

            showSnackbar.className='showAddBookSnackbar';

            setTimeout(
                ()=>{
                    showSnackbar.className=showSnackbar.className.replace('showAddBookSnackbar','');
                },3000
            )


            //REDIRECT TO THE ADMIN PAGE UPON ADDING A NEW BOOK AFTER SNACKBAR IS DISPLAYED

            setTimeout(
                ()=>{
                    window.location.href="http://localhost:5001/admin"
                },3100
            );

        }
    });
    
});
