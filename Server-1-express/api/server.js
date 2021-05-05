const express = require('express');
const fileSystem = require('./fileSystem');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();


app.use(cors())
app.use(express.json())

app.get('/', (req,res,next) => {
  const users = fileSystem.getData('db.json')
  res.send(users)
})

app.post('/', (req,res,next) => {
    const user = {
        
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        id: uuidv4(),

    }

    fileSystem.addData(user, 'db.json')
    res.send(user)
  })

app.listen(3000);