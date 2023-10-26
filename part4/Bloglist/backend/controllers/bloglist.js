const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// GET
blogRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({})
  
    response.json(blogs)
  }catch(error) {
    next(error)
  } 
})


// POST
blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  }).catch(error => next(error))
})


module.exports = blogRouter