import {useState} from 'react'
import blogService from '../services/blogs'

const NewBlog = () => {

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
      console.log('new Blog created', response)
    }
    catch(exception)
    {
      console.log(exception)
    }
  }

  return (
    <div>
      <div></div>
      <form onSubmit={createNewBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={handleChange}
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