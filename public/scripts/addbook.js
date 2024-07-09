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
            //add notification
        }else{
            //add notification
            //enable admin addboks
        }
    });
    
});
