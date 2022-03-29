const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')


beforeEach(async () => {
  await User.deleteMany({})
})

describe('Create users', () => {
  test('proper user is created', async () => {
    const user = {
        "username": "Raaka-Arska",
        "name": "Arska",
        "password": "salasana"
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('user with short username is not created', async () => {
    const user = {
        "username": "RA",
        "name": "Arska",
        "password": "salasana"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
    
    expect(result.body.error).toContain('username missing or too short')
  })

  test('user with short password is not created', async () => {
    const user = {
        "username": "Raaka-Arska",
        "name": "Arska",
        "password": "s"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
    
    expect(result.body.error).toContain('password missing or too short')
  })

  test('non-unique username is not created', async () => {
    const user = {
        "username": "Raaka-Arska",
        "name": "Arska",
        "password": "salasana"
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
    
    expect(result.body.error).toContain('username must be unique')
  })

  
})

afterAll(() => {
    mongoose.connection.close()
  })