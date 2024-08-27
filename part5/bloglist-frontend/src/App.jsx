import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Error from './components/Error'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoggedInUser from './components/LoggedInUser'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <LoginForm
        onLoginSubmit={handleLogin}
        username={username}
        onUsernameChange={handleUsernameChange}
        password={password}
        onPasswordChange={handlePasswordChange}
      />
    )
  }

  const newBlogRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Note" ref={newBlogRef}>
        <BlogForm createNewBlog={addBlog} />
      </Togglable>
    )
  }

  const blogDisplay = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            incrementLikeCount={incrementLikeCount}
            deleteBlogFromNotes={deleteBlogFromNotes}
          />
        ))}
      </div>
    )
  }

  const addBlog = async (newBlogObject) => {
    newBlogRef.current.toggleVisibility()
    await blogService.create(newBlogObject).then((blog) => {
      setBlogs(blogs.concat(blog)),
      setNewBlog(blog),
      setTimeout(() => {
        setNewBlog({})
      }, 4000)
    })
  }

  const incrementLikeCount = async (newBlogObject) => {
    await blogService.incrementBlogLike(newBlogObject).then((blog) => {
      console.log('Updated Blog: ', blog),
      setBlogs(
        blogs.map((currentBlog) =>
          currentBlog.id === blog.id ? blog : currentBlog
        )
      )
    })
  }

  const deleteBlogFromNotes = async (blogId) => {
    //const blogsWithoutDeletedBlog = blogs.filter((blog) => blog.id !== blogId)
    //setBlogs(blogsWithoutDeletedBlog)
    await blogService
      .deleteBlog(blogId)
      .then((deletedBlog) =>
        setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
      )
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (
    <div>
      <Error errorMessage={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <LoggedInUser user={user} onLogoutClick={handleLogout} />
          <Notification newBlog={newBlog} />
          {blogForm()}
          {blogDisplay()}
          {/* <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              incrementLikeCount={incrementLikeCount}
            />
          ))} */}
        </div>
      )}
    </div>
  )
}

export default App
