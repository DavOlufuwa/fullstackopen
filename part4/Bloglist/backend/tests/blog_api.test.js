const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


  test('there are blogs returned', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/ )
  }, 100000)


  test('unique identifier is named id', async () => {
   const response = await api.get('/api/blogs')
   expect(response.body[0].id).toBeDefined() 
  }, 100000)


  test('blog can be added with token', async () => {
    const newBlog = {
      title: "test blog",
      author: "test author",
      url: "test url",
      likes: 45,
    }

    const response = await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${helper.token}`)

    // expect response 201
    expect(response.status).toBe(201)

  }, 100000)

  test('blog cannot be added without token', async () => {
    const newBlog = {
      title: "blog without Token",
      author: "test author without token",
      url: "test url without token",
      likes: 45,
    }

    const response = await api.post('/api/blogs').send(newBlog)
    
    expect(response.status).toBe(401)
  }, 100000)

  test('likes property default value is zero', async () => {
    const newBlog = {
      title: "test blog",
      author: "test author",
      url: "test url"
    }

    const response = await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${helper.token}`)

    expect(response.body.likes).toBe(0)
  }, 100000)

  test('missing title or url returns 400', async () => {

    const newBlog = {
      author: "test bonkers",
      likes: 25
    }

    const response = await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${helper.token}`)

    expect(response.status).toBe(400)
  }, 100000)


  test('a valid blog cannot be deleted without token', async () => {
    const id = '653fd90e110afcbf1e067c4d'
    

    const responseB = await api.delete(`/api/blogs/${id}`)
    
    expect(responseB.status).toBe(401)

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


  afterAll(async () => {
    mongoose.connection.close()
  })
