const textService = require('./text-service');
const math = require('./math')

const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question('What would you like to do with the file: a. read-file b.append-file, c. write-file or choose math to execute any of the methods ? ' , answer => {
    switch(answer) {

        case 'read-file' :
            readFileTxt()
            break;
            
        case 'write-file' :
            writeFileTxt()
            break;

        case 'append-file' :
            appendFileTxt()
            break;

        case 'math':    
        rl.question("What method do you want to execute? ", method => {
            if (Object.keys(math).includes(method.trim())) {
              rl.question("What is the first number? ", num1 => {
                if (!num1.trim() || !Number(num1.trim())) {
                  console.log(`Problem with getting the first number.`);
                  rl.close();
                } else {
                  rl.question("What is the second number? ", num2 => {
                    if (!num2.trim() || !Number(num2.trim())) {
                      console.log(`Problem with getting the second number.`);
                      rl.close();
                    } else {
                      switch (method.toLowerCase()) {
                        case "sum":
                          result = math.sum(Number(num1), Number(num2));
                          break;
                        case "subtract":
                          result = math.subtract(Number(num1), Number(num2));
                          break;
                        case "multiply":
                          result = math.multiply(Number(num1), Number(num2));
                          break;
                        case "divide":
                          result = math.divide(Number(num1), Number(num2));
                          break;
                        default:
                          console.log("There has been an error!");
                          break;
                      }
          
                      console.log("RESUlT", result);
                      rl.close();
                    }
                  });
                }
              });
            } else {
              console.log(`Method ${method} not recognized, app stopped.`);
              rl.close();
            }
          });
          break;
          
        
        default :
        console.log('wrong input')
    }
})

const readFileTxt = () => {
    console.log(textService.readData('./file.txt'))
    rl.close()

}

const writeFileTxt = () => {
    rl.question('Input what you want to write to the text file: ', answer => {
        textService.writeData('./file.txt' , answer);
        rl.close();
    })
}

const appendFileTxt = () => {
    rl.question('Input what you want to append to the text file: ' , answer => {
        textService.appendFile('./file.txt' , answer);
        rl.close()
    })
}