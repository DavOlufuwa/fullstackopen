const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// GET
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId', { username: 1, name: 1 })
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


// POST
blogRouter.post('/', async (request, response, ) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

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
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  
  response.status(204).end()

})

const ypdate = {
  "title": "One Beer Two Pongs",
  "author": "Two Hearts",
  "url": "crazyrichasiana@gmail.com",
  "likes": 234,
  "userId": "653e33b8a7b9a32d147e0c55"
}


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