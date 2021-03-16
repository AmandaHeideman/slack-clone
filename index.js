//Det här är servern

//----------------------------- Socket, chat

const { response } = require('express');
const express = require('express')
const app = express();
const http = require('http').createServer(app);

//-----------------mongoose, db

const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb://localhost:27017/chat')
const db = mongoose.connection


db.on('error', error => {
  console.log(error);
})


const io = require('socket.io')(http);
const path = require('path')

app.use('/public', express.static(path.join(__dirname, 'public')))  //för att rendera ejs? 


app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/html/index.html');

  res.render('index.ejs')
  const MessageModel = require('./models/message_content')
  const UserModel = require('./models/user_info')
});



io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("chat message", message => {
    console.log('recieved message: ' + message);  //här tar vi emot eventet och skriver ut det 
    io.emit('chat message', message) //här skickar vi ut meddelandet? 
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })
});

http.listen(3000, () => {
  console.log('listening on :3000');
});

//--------------------------------------------  2.29