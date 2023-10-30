const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // First find the username in the database
  const user = await User.findOne({ username })

  // check the password that was written by comparing hashes
  const passwordCorrect = user === null 
  ? false 
  : await bcrypt.compare(password, user.passwordHash)

  // If the username and password are incorrect, return an error
  if(!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  // If the username and password are correct, create a token
  const userForToken = {
    username: user.username,
    id: user._id
  }
  // A token is created with the jwt.sign method and the userForToken object
  // only the parties who know the secret key can create a token
  // Ensure the token expires after 60 minutes
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })


  // A token, inclusive of the name and username is sent back
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter