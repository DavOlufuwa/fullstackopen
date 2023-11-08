const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


// GET
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId', { username: 1, name: 1 })
  response.json(blogs)
})

// POST
blogRouter.post('/', userExtractor, async (request, response ) => {
  const body = request.body
  const user = request.user
  
  // create a new blog
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    userId: user.id
  })
 
  const savedBlog = await blog.save()
  
  user.createdBlogs = user.createdBlogs.concat(savedBlog.id)
  
  await user.save() 
  
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
blogRouter.delete('/:id', userExtractor, async (request, response) => {

  const tokenId = request.user.id
  
  const blog = await Blog.findById(request.params.id)

  const userId = blog.userId.toString()

  if(tokenId !== userId) {
    return response.status(401).json({ error: 'Unauthorized action' })
  }

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