const lodash = require('lodash')

const dummy = (blogs) => {
  
  return 1 
}

const totalLikes = (blogs) => {
  
  if (blogs.length === 0){
    return 0
  }

  if(blogs.length === 1){
    return blogs[0].likes
  }

  if(blogs.length > 1){
    return blogs.reduce((reducer, item) => {
      return reducer + item.likes
    }, 0)
  }
}

const favoriteBlog = (blogs) => {

  // getting blogs with the most likes
  const mostLikes = blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
  })

  return mostLikes;
}


const authorWithMostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs, 'author')
  const maxAuthor = lodash.maxBy(Object.keys(authors), (author)=> authors[author])

  return {
    author: maxAuthor,
    blogs: authors[maxAuthor]
  }
}

const authorWithMostLikes = (blogs) => {
  const authorLikes = lodash.reduce(blogs, (result, blog) => {
    const author = blog.author;
    const likes = blog.likes

    result[author] = (result[author] || 0) + likes;

    return result

  }, {}) 

  const maxAuthor = lodash.maxBy(Object.keys(authorLikes), (author)=> authorLikes[author])

  return {
    author: maxAuthor,
    likes: authorLikes[maxAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes
}