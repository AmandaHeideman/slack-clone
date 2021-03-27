//Det här är servern

//const { response } = require('express');
const express = require('express')
const app = express();
const http = require('http').createServer(app);



const router = express.Router()
const expressEjsLayout = require('express-ejs-layouts') // används till våra vyer/views
const flash = require('connect-flash')
const session = require('express-session')

//const path = require('path')
const passport = require('passport')
require('./config/passport')(passport)  //hämtar funktionen passport från passport.js för att den ska köra sina grejer här. 


//-----------------mongoose, db

const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb://localhost:27017/chat')
const db = mongoose.connection

db.on('error', error => {
  console.log(error);
})

//EJS
app.set('view engine', 'ejs')  //detta gör att vi inte behöver specificera att våra filer vi ska rendera är av typen ejs, i våra routes
app.use(expressEjsLayout)

//sessions 
app.use(session({   //flash är beroende av den här sessionen för att fungera
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//passport 
app.use(passport.initialize())
app.use(passport.session())  //gör att vi kan spara vår userData i en session. session används både av passport och flash

//flash
app.use(flash())
app.use((request, response, next) => {  //vi vill lägga till våra meddelanden till requestet, för att skicka vidare meddelanden, typ som våra sessioner? 
  response.locals.success_msg = request.flash('success_msg') //meddelandet kommer komma med i vår respons
  response.locals.error_msg = request.flash('error_msg')
  response.locals.error = request.flash('error')
  next() //anropar nästa metod? 
})

//bodyparse för att ta emot post-data. om vi har express så kan vi använda oss av express.urlencoded ist för bodyparser
app.use(express.urlencoded({ extended: true }))


const io = require('socket.io')(http);
const path = require('path')

const fileupload = require('express-fileupload')
app.use('/public', express.static(path.join(__dirname, 'public')))  //för att använda oss av static routing, för att få våra statiska filer att läsas in från rätt ställe

app.use(fileupload({  //för att skapa mappen där filuppladdning ska hamna
  createParentPath: true
}))

app.use('/users/uploads', express.static(path.join(__dirname, 'uploads')))


// --------    chat
const MessageModel = require('./models/message_content')

/* app.get('/chat', (request, response) => {
  response.render('index.ejs')

  const MessageModel = require('./models/message_content')
  const UserModel = require('./models/users')
}); */


//----------------------------- Socket, chat
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', data => { //tar emot message + vilken kanal från en klient
    let chat_message = data.message;
    let channel = data.channel;
    let name = data.name;
    let date_sent = data.date_sent;

    const newMessage = new MessageModel({ chat_message, channel, name, date_sent })
    newMessage.save()

    io.emit('chat message', data) //skickar ut till klienter
  })
})



http.listen(3000, () => {
  console.log('listening on :3000');
});

//-------------------------------------------- passport/login stuff


//ROUTES!!

app.use('/', require('./routes/index'))  //vilket route-objekt som den ska användas. vi skippar att lägga route i en varibel
app.use('/users', require('./routes/users'))
app.use('/channels', require('./routes/channels'))
