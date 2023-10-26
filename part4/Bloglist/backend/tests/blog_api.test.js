const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


  beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(helper.initialBlogs[0])

    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])

    await blogObject.save()
  }, 1000000)



  // test('blogs are returned as json', async () => {
  //   await api
  //     .get('/api/blogs')
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/)
  // })

  // test('there are two blogs returned', async () => {
  //   const response = await api.get('/api/blogs')
  //   expect(response.body).toHaveLength(helper.initialBlogs.length)
  // })

  // test('a specific note is within the returned notes', async () => {
  //   const response = await api.get('/api/blogs')
    
  //   const contents = response.body.map(r => r.title)

  //   expect(contents).toContain('React patterns')
  // })



  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test blog A',
      author: 'test author A',
      url: 'http://testurl.com',
      likes: 5
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('test blog A')
  })


  test('a blog without contents is not added', async () => {
    const newBlog = {
      author: 'test author A',
      url: 'http://testurl.com',
      likes: 5
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  afterAll(async () => {
    mongoose.connection.close()
  })
