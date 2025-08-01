import { prisma } from "@/database/prisma";
import request from "supertest"
import { app } from "@/app";

describe('UserController', () => {
  let user_id: string
  
  afterAll( async () => {
    await prisma.user.delete({
      where: {
        id: user_id
      }
    })
  })

  it('should create a new user successfully', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test User',
      email: 'testuser@email.com',
      password: 'password123'
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toBe('Test User')

    user_id = response.body.id
  })

  it('should throw and error if user with the same email already exists', async () => {
    const response = await request(app).post('/users').send({
      name: 'Other User',
      email: 'testuser@email.com',
      password: 'password123'
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User with the same email already exists')
  })

  it('should throw a validation error if the email is invalid', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123'
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('validation error')
  })  
})