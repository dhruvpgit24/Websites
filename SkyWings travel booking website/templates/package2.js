let options = document.querySelectorAll("option");
let select = document.getElementById("select1");
let cont = document.querySelectorAll('.tour-container');
let button = document.querySelectorAll('button');
let cont2 = document.querySelectorAll('.place-img');
let packages = document.getElementById("packages");
let section = document.getElementById('section');
console.log("H!")
select.addEventListener('change', (event) => {
 
 cont.forEach((elem, i) => {
    let set = elem.getAttribute("data-city");
    if(select.value === 'ALL'){
    elem.style.display = 'flex';
    }
    else{
    if(set !== select.value){
     elem.style.display = 'none';
    }
    else{
     elem.style.display = 'flex';
     section.style.height = 'auto';
    }}
  })
cont2.forEach((elem, i) => {
    let set2= elem.getAttribute("data-city");
    if(select.value === 'ALL'){
    elem.style.display = 'flex';
    }
    else{
    if(set2!== select.value){
     elem.style.display = 'none';
    }
    else{
     elem.style.display = 'flex';
    }}
  })
})

button.forEach((btn, i) => {
 btn.addEventListener('click', (event) => {
     let attr = btn.getAttribute("data-id");
     let id = attr;
     localStorage.setItem("data-id", id);
     window.location.href = 'api.html';
 })
})
const currentPath = window.location.pathname;
 const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
     if (link.getAttribute('href') === currentPath) {
         link.classList.add('active');
     }
 });
console.log(localStorage);