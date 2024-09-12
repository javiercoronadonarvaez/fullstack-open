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
          data-testid="title"
          type="text"
          name="Title"
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="Title Input"
        />
      </div>
      <div>
        Author:
        <input
          data-testid="author"
          type="text"
          name="Author"
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder="Author Input"
        />
      </div>
      <div>
        Url:
        <input
          data-testid="url"
          type="text"
          name="Url"
          value={newUrl}
          onChange={handleUrlChange}
          placeholder="URL Input"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
