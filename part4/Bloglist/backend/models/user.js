const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  createdBlogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User