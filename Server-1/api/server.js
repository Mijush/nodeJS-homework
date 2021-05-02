const http = require('http');
const { v4: uuidv4 } = require('uuid');
const fileSystem = require('./fileSystem');

const server = http.createServer((req, res) => {
    const url = req.url;

    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');


    console.log(url);
    console.log(method);

    if (url === '/') {
        if (method === 'GET') {
            // 1. Get the data from the DB
            const data = fileSystem.readData('./db.json');
            // 2. Set the header (Content-Type)
            res.setHeader('Content-Type', 'text/html');
            // 3. Send the data
            res.write(data);
            // 4. End the connection
            res.end();
        }

        if (method === 'POST') {

            const body = [];
            req.on('data', chunk => {
                body.push(chunk)
            })

            req.on('end', () => {

                const parsedBody = Buffer.concat(body).toString();
                const user = JSON.parse(parsedBody);
                user.id = uuidv4();

                const dbData = fileSystem.readData('./db.json');
                const parsedData = JSON.parse(dbData);

                parsedData.push(user);
                const stringifiedData = JSON.stringify(parsedData);

                fileSystem.writeData('./db.json', stringifiedData)


            })
            res.setHeader('Content-Type', 'text/html');
            res.write('{"message": "Success!"}');
            res.end();

        }
    }
})

server.listen(3000, () => {
    console.log('Server is active at http://localhost:3000')
})