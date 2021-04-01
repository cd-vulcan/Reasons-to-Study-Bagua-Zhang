var username = document.getElementById('username');
var password = document.getElementById('password');
var form = document.getElementById('form');
var errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = []
    if (username.value === '' || username.value == null) {
        alert('Name is required!')  ;       /*changed ""name to user name because of resrved word list being obsolete*/
    } 
    if (password.value.length <= 6) {
        alert('Password must be larger than six charachters.');
    }
    if (password.value.length >= 20) {
            messages.push('Password must be less than 20 charatchters.');
        }
    if (password.value.length === 'password') {
            messages.push('Password cannot be password!');
    } 
    if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerText = messages.join(', ');
    } 

}) 