const userService = require('./userService');

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question('Choose if you want to sign-in or register: ' , answer => {
    switch(answer) {
        case 'sign-in':
            user()
            break;
        case 'register':
            register()
            break;
        default:
            console.log('wrong input')
    }
})


const user = () => {
  rl.question('Username: ', userName => {
      if(userName)
       {
    rl.question('Password: ', password => {
       if ( userService.getPassword(password) && userService.getUserName(userName) ) {
           console.log('User logged in!')
           rl.close();
       } else {
           console.log ('A User with that username or password was not found! ')
           rl.close()
       }
       
    })
            
      }
      
   
  })
  
}

const register = () => {
    rl.question('Input new username: ', userName => {
        if(userName) {
            rl.question('Input new password: ',password => {
             if(password){
                 userService.register(userName,password)
                 console.log('registered')
                 rl.close()
             } 
             
            })
            
        }
        
    })
}













