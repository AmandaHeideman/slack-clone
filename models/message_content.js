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
    /* Schema.Types.ObjectId,  */
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

/*
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  isbn: { type: String },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]

})

BookSchema
  .virtual('url')
  .get(() => {
    return `catalog/book/${this._id}`
  })

module.exports = mongoose.model('Book', BookSchema)
 */