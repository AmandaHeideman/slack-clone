const express = require('express')
const router = express.Router()

const User = require('../models/users') //nu kan vi använda oss av vår Users-models, db, vi hämtar in den här för att kunna använda den överallt
const bcrypt = require('bcrypt');

// login
router.get('/login', (request, response) => {  //  get.   det här kommer ligga under /users
  response.render('login')
})

//register page
router.get('/register', (request, response) => {  //  get.  det här kommer ligga under /users
  response.render('register')
})



router.post('/login', (request, response, next) => {   //post, next kommer att inehålla vad som ska hända när routerhanteringen är klar
  // ett nytt steg, the next function, när inloggningsgrejen är klar

  //autentisera login
  //redirect till channels
})

router.post('/register', (request, response) => {  //post, det vi postar med formuläret när vi registrerar en användare
  const { name, email, password } = request.body //för att ta emot data 

  let errors = []

  console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);

  if (!name || !email || !password) {
    errors.push({ msg: "please fill out all fields" })
  }

  if (password < 4) {
    errors.push({ msg: "please choose a bigger password" })
  }

  if (errors.length > 0) { // om det finns ett fel, rendera registersidan igen och skicka tillbaka datan så att användaren slipper skriva om allt
    response.render('register', { errors, name, email, password }) //men vi skicka också med felmedelandet så att vi kan skicka med det i vår template
  } else {  //skapa en användare/object av usermodellen!! VIKTIGT VIKTIGT 
    const newUser = new User({ name, email, password }
    )

    bcrypt.hash(password, 10, function (error, hash) { //password från form, 10 rundor salt
      // Store hash in your password DB. Här har vi skapat vårt krypterade lösenord? 
      newUser.password = hash
      newUser.save()
        .then(value => {
          request.flash('success_msg', 'You have been registered!') //key : value
          response.redirect('/users/login') //om allt går bra när man skapar en ny användare så får man en flash, och skickas sen till /users/login
        })
        .catch(error => console.log(error))  //om det inte går bra, skicka error
    })
  }
  //response.end()
})
//logout
router.get('/logout', (request, response) => {  //  get.   

})

module.exports = router //det vi vill exportera är vårt routerobjekt, som vi har konfigurerat här. 

