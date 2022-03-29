const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')



describe('Get blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    await Blog.insertMany(blogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  })
  
  test('correct number of blogs is returned', async () => {
      const response = await api.get('/api/blogs')
      const contents = response.body
      expect(contents).toHaveLength(helper.initialBlogs.length)
  })
  
  test('has a property named id', async () => {
      const response = await api.get('/api/blogs')
      const contents = response.body
      expect(contents[0].id).toBeDefined()
    })
  
})

describe('Post a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    await Blog.insertMany(blogs)

    await User.deleteMany({})
    await api
      .post('/api/users')
      .send(helper.initialUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  })

  test('adding blog increases length by one', async () => {
    const newBlog =  {
      "title": "avaruuden korkeajännitys",
      "author": "Rick Random",
      "url": "www.miljoonavolttia.com",
      "likes": 3,
    }

    const authHeader = await helper.loginHeader(api)
  
    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const contents = response.body
      expect(contents).toHaveLength(4)
  })

  test('right author is added', async () => {
    const newBlog =  {
      "title": "avaruuden korkeajännitys",
      "author": "Rick Random",
      "url": "www.miljoonavolttia.com",
      "likes": 3,
    }

    const authHeader = await helper.loginHeader(api)
  
    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const contents = response.body
      const authors = contents.map(content => content.author)
      expect(authors).toContain('Rick Random')
  })

  test('blog with no likes gets zero likes', async () => {
    const newBlog =  {
      "title": "turha täyteblogi",
      "author": "Nolla-Kojo",
      "url": "www.kauheaaroskaa.com",
    }

    const authHeader = await helper.loginHeader(api)
  
    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const contents = response.body
      const blog = contents.find(content => content.author === 'Nolla-Kojo')
      expect(blog.likes).toBe(0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      "author": "Horse without no name",
      "url": "www.notitlenocry.com",
    }

    const authHeader = await helper.loginHeader(api)
  
    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('posted blog without a token is rejected', async () => {
    const newBlog = {
      "author": "Horse without no name",
      "url": "www.notitlenocry.com",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('Deleting a blog ', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api
      .post('/api/users')
      .send(helper.initialUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    

    const users = await helper.usersInDb()
    const user = users[0]

    await Blog.deleteMany({})
    const blogs = helper.initialBlogs.map(blog => new Blog({...blog, user: user.id}))
    await Blog.insertMany(blogs)

  })

    test('A deleted blog is gone from the db', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const id = blogToDelete.id

    const authHeader = await helper.loginHeader(api)

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', authHeader)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('Updating a blog', () => {
  test('Updating a blog will change the number of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const id = blogToUpdate.id

    updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const retrievedBlog = blogsAtEnd.find(blog => blog.id === id);
    expect(retrievedBlog.likes).toEqual(blogToUpdate.likes + 1);
    
  })
})

afterAll(() => {
    mongoose.connection.close()
  })
  