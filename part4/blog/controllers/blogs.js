const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  // console.log('Request Token', request.token)
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  if (!request.decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  // const blog = new Blog({
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes || 0,
  //   user: { id: user.id },
  // });

  // const savedBlog = await blog.save()
  const savedBlog = await blog.save()
  console.log('SAVED BLOG', savedBlog)
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  const createdBlog = await Blog.findById(savedBlog.toJSON().id).populate(
    'user',
    {
      username: 1,
      name: 1,
      id: 1,
    }
  )
  response.status(201).json(createdBlog.toJSON())
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: 'token invalid' })
    // }
    if (!request.decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    //console.log('Decoded Token ID', decodedToken.id)
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      //response.status(204).end()
      console.log('Deleted Blog Backend: ', blog)
      //response.status(204).json(blog);
      response.json(blog)
    } else {
      return response
        .status(401)
        .json({ error: 'Token does not correspond to Blog author' })
    }
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  if (!request.decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter
