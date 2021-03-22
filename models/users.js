const mongoose = require('mongoose') //vi sätter upp  mongoose
const UserSchema = new mongoose.Schema({   //vi sätter upp ett schema
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('User', UserSchema)  //här gör vi en modell av allt, som vi sen exporterar.
  // för att använda oss av modellen så måste vi läsa in den där vi behöver den,
 // vi kommer att behöva den på flera ställen, för att skapa användare och lägga till dom i vår databas, så behöver vi dom i vår users-route. --> */
