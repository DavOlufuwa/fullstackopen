const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const {Schema, model} = mongoose


const blogSchema = new Schema({
  title: String, 
  author: String,
  url: String,
  likes: Number,
})


blogSchema.set('toJSON', {
  transform: ( document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  } 
})

const Blog = model('Blog', blogSchema)



module.exports = Blog

