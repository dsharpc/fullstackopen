const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({

  name: String,
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  passwordHash: String

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User