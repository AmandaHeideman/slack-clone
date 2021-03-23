const express = require('express');
const http = require('http');
const io = require('socket.io')(http);

const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

let channels = ['Frontend 1', 'Frontend 2', 'Random']

//Renderar befintliga kaneler på startsidan
router.get('/', ensureAuthenticated, (req, res) => { //anropar funktionen varje gång vi försöker gå till channels, kollar om vi är inlogade
  const user = req.user
  const name = user.name
  console.log(user.name);
  res.render('channelList', { channels: channels, name: name }); //vi sparar name i en variabel och skickar med
})

//Lägger till nya kanaler som skapas
router.post('/', (req, res) => {
  let newChannel = req.body.newChannel;
  channels.push(newChannel);
  res.render('channelList', { channels: channels });
})


//Renderar ut enskild kanal
router.get('/:channel', ensureAuthenticated, (req, res) => {
  const user = req.user
  const name = user.name
  let channel = req.params.channel
  res.render('channels', { channel: channel, name: name })
})


module.exports = router;