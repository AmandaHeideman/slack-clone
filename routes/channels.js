const express = require('express');
const http = require('http');
const io = require('socket.io')(http);

const router = express.Router();

let channels = ['Frontend 1', 'Frontend 2', 'Random']

//Renderar befintliga kaneler på startsidan
router.get('/', (req, res) => {
  res.render('channelList', { channels: channels});
})

//Lägger till nya kanaler som skapas
router.post('/', (req, res) => {
  let newChannel = req.body.newChannel;
  channels.push(newChannel);
  res.render('channelList', { channels: channels});
})


//Renderar ut enskild kanal
router.get('/:channel', (req, res) => {
  let channel = req.params.channel
  res.render('channels', {channel: channel})
})


module.exports = router;