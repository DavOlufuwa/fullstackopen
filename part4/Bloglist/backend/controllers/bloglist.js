const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// GET
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// POST
blogRouter.post('/', (request, response, ) => {
  const blog = new Blog(request.body)

  const savedBlog = await.blog.save()
  response.status(201).json(savedNote)
})

// GET BY ID
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogRouter