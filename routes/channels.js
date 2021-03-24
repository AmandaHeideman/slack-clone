const express = require('express');
const http = require('http');
const io = require('socket.io')(http);

const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


const ChannelModel = require('../models/channels')

//Renderar befintliga kaneler på startsidan
router.get('/', ensureAuthenticated, async(req, res) => { //anropar funktionen varje gång vi försöker gå till channels, kollar om vi är inlogade
  const user = req.user
  const name = user.name

  const channels_from_db = await ChannelModel.find(); //hämtar alla channels från databas
  
  res.render('channelList', { channels: channels_from_db, name: name }); //vi sparar name i en variabel och skickar med
})

router.get('/api', async(req, res) => { //skickar ett json till /channels/api med info från databasen
  const channels_from_db = await ChannelModel.find();
  res.json(channels_from_db)
})

//Lägger till nya kanaler som skapas
router.post('/', ensureAuthenticated, async(req, res) => {
  let channel = req.body.newChannel;
  //channels.push(channel);

  let channel_name = channel;
  const newChannel = new ChannelModel({ channel_name })
  newChannel.save()

  const user = req.user
  const name = user.name

  const channels_from_db = await ChannelModel.find();
  res.render('channelList', { channels: channels_from_db, name: name });
})


//Renderar ut enskild kanal
router.get('/:channel', ensureAuthenticated, (req, res) => {
  const user = req.user
  const name = user.name
  let channel = req.params.channel
  res.render('channels', { channel: channel, name: name })
})


module.exports = router;