
// Token atuh
const Token = window.localStorage.getItem('token');
console.log(Token)

const blogpost = document.querySelector('.blogpost');
const form = document.querySelector('.form')

const loginbtn = document.querySelector('#login')
const logoutbtn = document.querySelector('#logout')



// Token atuh

fetch('http://127.0.0.1:8000/api/token',{
    method: 'POST',
    headers:{
        Authorization : `Token ${Token}`
    }
}).then(res => res.json())
.catch(error => console.log(error));

// Token atuh


const auth = () => {
    if (Token != null){
        loginbtn.setAttribute('id', 'd-none');
        logoutbtn.removeAttribute('id', 'd-none');
    }else{
        logoutbtn.setAttribute('id', 'd-none');
        loginbtn.removeAttribute('id', 'd-none');    
    }
}



function creatpost(id, title, content){
    let post = document.createElement('div')
    post.innerHTML = `
    <h3 class="text-uppercase">${title}</h3>
    <p>${content}</p>
    <button class="btn btn-danger" type="submit" onclick="deletedata(${id})">Delete</button>
    <hr>
    `
    return post;
}

function deletedata(id){
    console.log('Post = delete')
    fetch(`http://127.0.0.1:8000/api/deletepost/${id}`,{
        method: 'DELETE',
        headers:{Authorization : `Token ${Token}`}
    }).then(res => res.json)
    .then(data => {
        fetchdata()
    })
    .catch(error => console.log(error))
}
function fetchdata(){
    console.log('patching data...')
    fetch('http://127.0.0.1:8000/api/getblogpost')
    .then(responce => responce.json())
    .then(data =>{        
        blogpost.innerHTML = '';
        data.forEach(data => {
            blogpost.appendChild(creatpost(data.id, data.title, data.content))
        });
    } )
    .catch(error => console.log(error))
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    const newdata = new FormData(form)
    const formdata = Object.fromEntries(newdata)
    
    fetch('http://127.0.0.1:8000/api/postdata',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        Authorization : `Token ${Token}`
                },
        body: JSON.stringify(formdata)
    }).then(res => (res.json()))
    .then(data => {
        if(data.true){
            document.querySelector('[name="title"]').value = ''
            document.querySelector("[name='content']").value = ''
            fetchdata() 
        }
    })
    
});

function logout(){
    window.localStorage.removeItem('token');
    console.log('Loged Out...')
    window.location.href = '/'
}

fetchdata(); 
auth();

