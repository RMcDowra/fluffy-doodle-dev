console.log('im on a node server, yo');

const express = require('express')
const app = express()

app.use(express.static('./public/'))

app.get('/', function (req, res) {
  // res.send('Hello World')
  res.sendFile('index.html')
})

app.listen(3000)
