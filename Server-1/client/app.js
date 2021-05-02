
const API_URL = 'http://localhost:3000';


const getButton = document.querySelector('#btn-get');
const postButton = document.querySelector('#btn-post');



const nameInput = document.querySelector('#name-input');
const userNameInput = document.querySelector('#username-input');
const emailInput = document.querySelector('#email-input');



const usersContainer = document.querySelector('#users-posts');

getButton.addEventListener('click' , () => {
    getUsers()
})

postButton.addEventListener('click', (e) => {
    e.preventDefault();
    let user;

    user = getFormInput()
    postUser(user)
})

const getUsers = () => {
    fetch(`${API_URL}`)
    .then(response => response.json())
    .then(result => {
        renderUsers(result)
    })
}

const postUser = (newUser) => {
    fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type' : 'text/plain' },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

const renderUsers = (users) => {
    let inner = '';
    console.log(users);
    users.forEach((user) => {
        inner += 
        `
        <div>
        <ul>
       
        <li>Name: ${user.name}</li>
        <li>Username: ${user.username}</li>
        <li>E-mail: ${user.email}</li>
        <br>
          
        </ul>
        </div>
        `
    })
    usersContainer.innerHTML = inner;
}

const getFormInput = () => {
    const name = nameInput.value;
    const username = userNameInput.value;
    const email = emailInput.value;

    const newUser = {
       name,
       username,
       email
    };

    return newUser;
}