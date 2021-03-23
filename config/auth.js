module.exports = {
  ensureAuthenticated: (request, response, next) => {    //det här är en funktion som kollar om man är inloggad
    if (request.isAuthenticated()) {
      return next() //anropar nästa funktion i listan, nästa middleware
    } else {
      request.flash('error_msg', 'please login to view this page')
      response.redirect('/users/login')
    }
  }
}
