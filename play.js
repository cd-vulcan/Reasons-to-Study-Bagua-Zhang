var username = document.getElementById('name');
var password = document.getElementById('password');
var subBtn = document.getElementById('button');

document.addEventListener('DOMContentLoaded', ()=>{
    subBtn.addEventListener('click', isLoginFormValid);
    console.log("this shit is wack!!!!!");
})

const isLoginFormValid = () =>{
    if(username.value === ""){
        alert("need username!");
    }
    if(password.value === "" || password.value !== '123'){
        alert("This is WACK!!!! Put in the correct password PLEASE!");
    }
    if(password.value === '123'){
        alert(`thank you for entering the correct password ${username.value}`); /* alert works without usernamne */
    }
}
const portfolioItems = document.querySelectorAll('.portfolio-item-wrapper');

portfolioItems.forEach(portfolioItem => {
    portfolioItem.addEventListener('mouseover', () => {
        console.log(portfolioItem.childNodes[1].classList);
        portfolioItem.childNodes[1].classList.add('image-blur');
    });

    portfolioItem.addEventListener('mouseout', () => {
        console.log(portfolioItem.childNodes[1].classList);
        portfolioItem.childNodes[1].classList.remove('image-blur');
    });
})