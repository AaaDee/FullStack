const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "punainen jaguaari",
    "author": "Jerry Cotton",
    "url": "www.jeejee.com",
    "likes": 3,
  },
  {
    "title": "punainen jaguaari rides again",
    "author": "Jerry Cotton",
    "url": "www.jeejee.com",
    "likes": 3,
  },
  {
    "title": "punainen jaguaari rides again 2",
    "author": "Jerry Cotton",
    "url": "www.jeejee.com",
    "likes": 3,
  }
]

const initialUser = {
  "username": "Raaka-Arska",
  "name": "Arska",
  "password": "salasana"
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const loginHeader = async (api) => {
  const response = await api
    .post('/api/login')
    .send({ username: initialUser.username, password: initialUser.password })
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const authHeader = `bearer ${response.body.token}`
  return authHeader
}


module.exports = {
  initialBlogs, initialUser, blogsInDb, usersInDb, loginHeader
}