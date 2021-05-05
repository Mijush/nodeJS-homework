const usersContainer = document.querySelector('#users-posts');


const getButton = document.querySelector('#btn-get');
const postButton = document.querySelector('#btn-post');

const nameInput = document.querySelector('#nameInput');
const userNameInput = document.querySelector('#usernameInput');
const emailInput = document.querySelector('#emailInput');


const API_URL = 'http://localhost:3000';



const getUsers = () => {
    fetch(`${API_URL}`)
    .then(response => response.json())
    .then(result => {
        renderUsers(result)
    })
}

const postUser = (newUser) => {
    fetch(`${API_URL}` , {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type' : 'application/json' }
       
    })
    .then(response => response.json())
    .then(newUser => console.log(newUser))
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

getButton.addEventListener('click' , () => {
    getUsers()
})

postButton.addEventListener('click', (e) => {
    e.preventDefault();
    const user = getFormInput()

   
    postUser(user)
})

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
