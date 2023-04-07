const logform = document.querySelector('.logform')
const Token = window.localStorage.getItem('token');


// Token atuh
fetch('http://127.0.0.1:8000/api/token',{
    method: 'POST',
    headers:{
        Authorization : `Token ${Token}`
    }
}).then(res => res.json())
.then(data => {
    if(data.verify){
        
    }
}).catch(error => console.log(error));
// Token atuh


    // window.location.href = '/';
console.log(Token)

logform.addEventListener('submit', (event) => {
    event.preventDefault();
    const newform = new FormData(logform)
    const formdata = Object.fromEntries(newform)
    console.log(formdata)
    fetch('http://127.0.0.1:8000/api/login',{
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(formdata)
    }).then(responce => responce.json())
    .then(data => {
        console.log(data.token)
        window.localStorage.setItem('token', data.token);
        console.log(window.localStorage.getItem('token'));
        window.location.href = '/';
    }).catch(error => console.log(error))
})
