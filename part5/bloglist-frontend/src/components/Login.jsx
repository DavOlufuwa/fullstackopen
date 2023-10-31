import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
const Login = ({ userState }) => {

  const {setUser, username, setUsername, password, setPassword} = userState
  
  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      const logginUser = await loginService.login({
        username, password
      })
      setUser(logginUser)
      blogService.setToken(logginUser.token)
      setUsername('')
      setPassword('')
      localStorage.setItem('loggedBlogListUser', JSON.stringify(logginUser))
      
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log('Wrong credentials')
    }
  }
  
  
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            type="text" 
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login