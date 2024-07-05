const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSingupLink = document.querySelectorAll(".form-box .bottom-link a");
const bgoverlay = document.querySelector('.blur-bg-overlay');


function showpopup(){document.body.classList.toggle("show-popup");}
  
  







//Show form popup
/*showPopupBtn.addEventListener("click",() => {
  document.body.classList.toggle("show-popup");
});

//Hide form popup
 hidePopupBtn.addEventListener("click",() => showPopupBtn.click());*/

 loginSingupLink.forEach(link =>{
  link.addEventListener("click", (e) => {
     e.preventDefault();
     //console.log(link.id);
     formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
  });
 });
 