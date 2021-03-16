const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageContentSchema = new Schema({
  chat_message: {
    type: String,
    required: true,
    maxlength: 200
  },
  user: {
    type: String,
    required: true,
    maxlength: 20
  },
  date_sent: {
    type: date
  }

})


MessageContentSchema
  .virtual('url')
  .get(() => {
    return `/catalog/user/${this._id}`

  })

module.exports = mongoose.model('Message', MessageContentSchema)
