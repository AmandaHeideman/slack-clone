const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  channel_name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Channel', ChannelSchema)

