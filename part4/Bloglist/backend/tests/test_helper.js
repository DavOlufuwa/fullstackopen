const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhdmUiLCJpZCI6IjY1M2UzM2I4YTdiOWEzMmQxNDdlMGM1NSIsImlhdCI6MTY5ODY4MTcyNSwiZXhwIjoxNjk4Njg1MzI1fQ.pAbC4xozqSc2lmMbGyXdXYulvFyoJ9jKw3nKvMLJm-A"


module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  token
}