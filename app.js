const express = require('express')

const app = express()

const http = require('http')
const server = http.createServer(app)

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

server.listen(3000, () => {
  console.log('Listening to port 3000');
})
