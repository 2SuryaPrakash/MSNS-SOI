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



const openUpdateBookPopUpOverlay=(book,bookid)=>{
    let popup=document.getElementById('admin-addbook');
    let popupbgblur=document.getElementById('admin-addbook-blur-overlay');
    let nowupdating=document.querySelector('.admin-updateBook-nowupdating');
    nowupdating.textContent=book.title;
    let fieldElements=document.querySelectorAll('.admin-addbook-form input');
    fieldElements[0].value=book.title;
    fieldElements[1].value=book.description;
    fieldElements[2].value=book.author;
    fieldElements[3].value=book.genre;
    fieldElements[4].value=book.department;
    fieldElements[5].value=book.count;
    popup.style.opacity="1";


    popup.style.height="100%";
    popupbgblur.style.height="100%";

    popup.style.visibility="visible";
    popupbgblur.style.visibility="visible";
    document.querySelector('#admin-addbook-update-button').addEventListener('click',()=>{
        let fieldElements1=document.querySelectorAll('.admin-addbook-form input');
        let newbook={id:bookid,title:fieldElements1[0].value,description:fieldElements1[1].value,author:fieldElements1[2].value,genre:fieldElements1[3].value,department:fieldElements1[4].value,count:fieldElements1[5].value};
        fetch('http://localhost:5001/admin/updatebook',{body:JSON.stringify(newbook),method:"POST",headers: { 'Content-Type': 'application/json' }}).then((res)=>{return res.json()})
    .then((response)=>{
        if(response.status=='fail'){
            //add notification
            console.log('fail')
        }else{
            
            console.log('pass');

             

            
            //add notification add after reload
            let snackbar=document.querySelector('.update-book-snackbar');
            const titleData=document.querySelector('.update-book-snackbar span');
            titleData.textContent=title.value;
            snackbar.classList.add('showSnackbar');


            setTimeout(()=>{
                snackbar.className=snackbar.className.replace('showSnackbar','');
            },3000);

            setTimeout(()=>{
                location.reload(); 
            },3200);



            //enable admin addboks
            console.log(newbook); 
        }
    });
    });


};

const closeUpdateBookPopUpOverlay=()=>{
    let popup=document.getElementById('admin-addbook');
    let popupbgblur=document.getElementById('admin-addbook-blur-overlay');

    popup.style.opacity="0";


    popup.style.height="0%";
    popupbgblur.style.height="0%";  

    popup.style.visibility="hidden";
    document.querySelector('#admin-addbook-update-button').removeEventListener('click',()=>{});
    popupbgblur.style.visibility="hidden";

};


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
            // updateBookSnackbar(book.title);
            openUpdateBookPopUpOverlay(book,x.classList[1]);
        }); 
    });
});

            

            



