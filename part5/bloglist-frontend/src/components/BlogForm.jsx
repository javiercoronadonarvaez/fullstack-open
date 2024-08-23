import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    createNewBlog(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addNewBlog}>
      <h2>Create New</h2>
      <div>
        Title:
        <input
          type="text"
          name="Title"
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          name="Author"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          name="Url"
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
