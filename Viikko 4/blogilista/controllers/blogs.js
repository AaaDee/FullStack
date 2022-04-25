const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')




const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  console.log('id', request.user._id.toString())
  const user = await User.findById(request.user._id.toString())
  console.log('user', user)

  const blog = new Blog({
    ...body,
    user: user
  })

  const  savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor,  async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() !== blog.user._id.toString()) {
    return response.status(401).json({ error: 'incorrect user' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  user.blogs = user.blogs.filter(userBlog => userBlog._id.toString() !== request.params.id)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    ...body
  }

   const updatedBlog =  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
   response.status(200).json(updatedBlog)
})

module.exports = blogsRouter