const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: Message,
    required: true,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    maxlength: 20
  }
})

UserSchema
  .virtual('url')
  .get(() => {
    return `/catalog/user/${this._id}`

  })


module.exports = mongoose.model('User', UserSchema)