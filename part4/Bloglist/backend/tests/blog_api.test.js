const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


  test('there are three blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
  }, 100000)


  test('unique identifier is named id', async () => {
   const response = await api.get('/api/blogs')
   expect(response.body[0].id).toBeDefined() 
  }, 100000)

  test('a blog can be added to the database', async () => {
    const newBlog = {
      title: "test blog",
      author: "test author",
      url: "test url",
      likes: 0
    }

    const response = await api.post('/api/blogs').send(newBlog)

    const bloglist = await api.get('/api/blogs')
    // expect response 201
    expect(response.status).toBe(201)

    expect(bloglist.body).toHaveLength(4)

  }, 100000)

  test('likes property default value is zero', async () => {
    const newBlog = {
      title: "test blog",
      author: "test author",
      url: "test url"
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.body.likes).toBe(0)
  }, 100000)

  test('missing title or url returns 400', async () => {

    const newBlog = {
      author: "test bonkers",
      likes: 25
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(400)
  }, 100000)


  test('a valid blog can be deleted', async () => {
    const id = '653beb9aa52c777f64d33e0e'
    
    
    const responseB = await api.delete(`/api/blogs/${id}`)
    
    const newNumber = await api.get('/api/blogs')

    expect(responseB.status).toBe(204)

    expect(newNumber.body).toHaveLength(2)

  }, 100000)

  test('blog can be updated', async () => {
    const id = "653a85cdc8b2c3d2cc228abb"

    const newLikes = {
      likes: 100
    }

    const response = await api
    .put(`/api/blogs/${id}`)
    .send(newLikes)

    expect(response.status).toBe(200)
    expect(response.body.likes).toEqual(100)

  }, 100000)


  test('blog can be created', async () => {
    const newBlog = {
      title: "One Beer Two Pongs",
      author: "Two Hearts",
      url: "crazyrichasiana@gmail.com",
      likes: 234,
      userId: "653e33b8a7b9a32d147e0c55"
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(201)

    
  }, 100000)



  afterAll(async () => {
    mongoose.connection.close()
  })
