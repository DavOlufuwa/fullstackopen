import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import '../index.css'
import Toggler from './components/Toggler'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false);


  
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogListUser'))
    if(loggedUser){
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
    else{
      setUser(null)
      blogService.setToken(null)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = () => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }    
    fetchBlogs()
  }, [update])

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }
  return (    
    <>
      <h2>blogs</h2>   
      {
        showForm && 
          <Login 
            userState={{
            user, 
            setUser, 
            username, 
            setUsername, 
            password, 
            setPassword,
            error,
            message,
            setError,
            setMessage
          }}
        />
      }
      {
        showForm ? <button onClick={() => setShowForm(false)}>cancel</button> :
        user === null && <button onClick={() => setShowForm(true)}>Log in</button>
      }
      <>        
        { user && 
          <>
            <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p> 
            <Toggler buttonlabel= "create new blog">
              <Notification message={message} error={error}/>
              <NewBlog blogProps={{setUpdate, setMessage, setError}} />
            </Toggler>
          </>
        }
        <div>
        
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </>
    </>
  )
}

export default App