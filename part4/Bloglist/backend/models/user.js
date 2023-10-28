const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  passwordHash: String,
  createdBlogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

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