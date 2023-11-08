import {useState, } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({blogProps}) => {

  const {setUpdate, setError, setMessage} = blogProps

  const [newBlog, setNewBlog] = useState({
    title : "",
    author : "",
    url : "",
    likes : 0  
  })

  const {title, author, url, likes} = newBlog

  const handleChange = (e) => {
    const {name, value} = e.target
    setNewBlog({
      ...newBlog,
      [name] : value
    })
  }

  const createNewBlog = async (e) => {
    e.preventDefault()
    try {
      const response = await blogService.create(newBlog)
      setNewBlog({
        title : "",
        author : "",
        url : "",
        likes : 0
      })
      setUpdate("updated")
      setMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    catch(exception)
    {
      setUpdate("not updated")
      setError(true)
      setMessage("Blog is not added")
      setTimeout(() => {
        setError(false)
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <form onSubmit={createNewBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input 
            type="text" 
            id="author" 
            value={author}
            name="author"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input 
            type="text" 
            id="url" 
            value={url}
            name="url"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="likes">Likes:</label>
          <input 
            type="number" 
            id="likes" 
            value={likes}
            name="likes"
            onChange={handleChange}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default NewBlog