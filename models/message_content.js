const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageContentSchema = new Schema({
  chat_message: {
    type: String,
    required: true,
    maxlength: 200
  },
  channel: {
    type: String
  },
  name: {
    type: String,
    ref: 'User', required: true
  },
  date_sent: {
    type: String
  }
})


MessageContentSchema
  .virtual('url')
  .get(() => {
    return `/catalog/user/${this._id}`

  })

module.exports = mongoose.model('Message', MessageContentSchema)
