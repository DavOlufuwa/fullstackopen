const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// GET USERS
userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('createdBlogs')
  response.json(users)
})

// CREATE NEW USER
userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// DELETE A USER
userRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = userRouter
