const express = require('express')
const router = express.Router()

//login page
router.get('/', (request, response) => {
  response.render('welcome')
})


module.exports = router //det vi vill exportera är vårt routerobjekt, som vi har konfigurerat här. 

