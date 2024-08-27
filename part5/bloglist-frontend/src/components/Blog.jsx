import { useState } from 'react'

const Blog = ({ user, blog, incrementLikeCount, deleteBlogFromNotes }) => {
  const [display, setDisplay] = useState(false)
  const [numLikes, setNumLikes] = useState(blog.likes)

  const handleDisplayButton = () => {
    setDisplay(!display)
  }

  const incrementLikeDisplay = () => {
    const increasedNumLikes = numLikes + 1
    setNumLikes(increasedNumLikes)
    const newBlogObject = {
      ...blog,
      likes: increasedNumLikes,
    }
    console.log('New Blog Object: ', newBlogObject)
    incrementLikeCount(newBlogObject)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      {
        console.log('Deleted Post'), deleteBlogFromNotes(blog.id)
      }
    }
  }

  const showAll = { display: display ? '' : 'none' }
  const showLimited = { display: display ? 'none' : '' }
  const showDelteButton = {
    display: blog.user.id === user.id ? '' : 'none',
  }

  return (
    <div>
      <div style={showLimited} className="blogShowLimited">
        <p>
          {blog.title} {blog.author}
          <button onClick={handleDisplayButton}>view</button>
        </p>
      </div>
      <div style={showAll} className="blogShowAll">
        <p>
          {blog.title} {blog.author}
          <button onClick={handleDisplayButton}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          Likes: {numLikes} <button onClick={incrementLikeDisplay}>like</button>
        </p>
        <p>{blog.author}</p>
        <button style={showDelteButton} onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  )
}

export default Blog
