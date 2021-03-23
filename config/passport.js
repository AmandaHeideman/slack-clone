const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')  //compare för att jämföra användarens login-lösenord med det i databasen
const User = require('../models/users')  //vi läser in vår användarmodel


//för att loggga in, kontrollera lösen och användarnamn mot db
module.exports = function (passport) {
  passport.use(new LocalStrategy(  //den här "use-funktionen" passport skickar vi till app.js  
    {
      usernameField: 'email'  //eftersom att vi bytt namn på username till "email".
    },

    function (username, password, done) { //password innehåller det vi skrev in i formulär. 
      User.findOne({ email: username }, function (error, user) {  //USER HÄRIFRÅN
        if (error) {
          return done(error)//fastnar vi här så betyder det att vi inte får tag på db
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }

        //vi vill jämföra det lösenord användaren skrivit in i login, mot den krypterade strängen som finns i vårt user-objekt i db.
        bcrypt.compare(password, user.password, (error, isMatch) => { //isMatch kommer innehåller en boolean, baserad på om lösenorden stämmer överens eller inte
          if (error) {
            throw error
          }

          if (isMatch) {
            return done(null, user)  //Vi returnerar vårt user-objekt om lösenorden matchar, vi hämtar dom där uppe ^
          } else {
            return done(null, false, { message: 'Incorrect password.' })
          }
        })
      })
        .catch(error => console.log(error))  //om något blir fel
    }
  ))

  //för att spara vårt userobjekt i sessionen, så att vi kan komma åt userdatat sen i våra sidor
  passport.serializeUser((user, done) => {   //serialiserar hela vårt objekt och använder sig av den här som nyckel
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user)  //done-funktionen får vi från passport
    })
  })
}