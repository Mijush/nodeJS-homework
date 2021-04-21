const fs = require('fs');

const getUsers = () => {
 let data = fs.readFileSync('./users.json');
 let parsedData = JSON.parse(data);
 return parsedData.users;
}

const getUserName = (userName) => {
    let users = getUsers();
    const user = users.find(u => u.userName === userName );
    return  user;
    
}

const getPassword = (password) => {
    let users = getUsers();
    const passWord = users.find(u => u.password === password );
    return passWord;
}


const register = (user,passWord) => {
    let users = getUsers();
    const userExist = users.find(u => u.userName === user );
    const passwordExist = users.find(u => u.password === passWord)
    if (userExist) throw new Error(`A user with that username already exists in the DB.`);
    
    if(passwordExist) throw new Error(`A user with that password already exists in the DB.`);

    
    users = [...users, new User(user,passWord)]
    saveUser(users);
}


const saveUser = (users) => {
 let data = {users};
 let stringifiedData = JSON.stringify(data);
 fs.writeFileSync('./users.json',stringifiedData)
}

function User(userName,password) {
    this.userName = userName,
    this.password = password
}



module.exports = {
    getUsers,
    getUserName,
    getPassword,
    register
}