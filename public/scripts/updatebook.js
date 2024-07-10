  const deleteBookSnackbar=(title)=>{
    let snackbar=document.getElementById('delete-book-snackbar');
    const titleData=document.querySelector('#delete-book-snackbar span');
    titleData.textContent=title;
    snackbar.classList.add('showSnackbar');

    setTimeout(()=>{
        snackbar.className=snackbar.className.replace('showSnackbar','');
    },3000);

};  

let deleteButtons=document.querySelectorAll('.delete');
deleteButtons.forEach((x)=>{
    x.addEventListener('click',async ()=>{
        fetch('http://localhost:5001/getbook/'+x.classList[1]).then((res)=>{return res.json()}).then((book)=>{
            const card = x.closest(".search-bookDisplay-card"); // Find the closest ancestor with the desired class
            card.remove();
            deleteBookSnackbar(book.title);

        }); 
        await fetch('http://localhost:5001/deletebook/'+x.classList[1]);
        
    });
});  

const updateBookSnackbar=(title)=>{
    let snackbar=document.querySelector('.update-book-snackbar');
    const titleData=document.querySelector('.update-book-snackbar span');
    titleData.textContent=title;
    snackbar.classList.add('showSnackbar');
    

    setTimeout(()=>{
        snackbar.className=snackbar.className.replace('showSnackbar','');
    },3000);

};
let updateButtons=document.querySelectorAll('.update');
updateButtons.forEach((x)=>{
    x.addEventListener('click',()=>{
        fetch('http://localhost:5001/getbook/'+x.classList[1]).then((res)=>{return res.json()}).then((book)=>{
            updateBookSnackbar(book.title);

        }); 
    });
});