const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// GET
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// POST
blogRouter.post('/', async (request, response, ) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
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

// DELETE BY ID
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  
  response.status(204).end()

})


// UPDATE BY ID

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const blogUpdate = {
    likes : body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogUpdate, { new: true})

  response.json(updatedBlog)
})


module.exports = blogRouter