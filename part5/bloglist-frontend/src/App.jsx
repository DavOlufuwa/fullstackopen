import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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
  }, [])

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  return (
    <>
      {
        user === null ? 
        <Login 
          userState={{
            user, 
            setUser, 
            username, 
            setUsername, 
            password, 
            setPassword
          }}
        />
        :
        <>
          <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
          <div>
            <h2>blogs</h2>
            <NewBlog user={user} />
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        </>
      }
    </>
  )
}

export default App