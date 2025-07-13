const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)


describe('REST API tests with an initialized blog database', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    // GET tests
    describe('GET tests', () => {
        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')
            assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })

        test('a returned object has the id property', async () => {
            const response = await api.get('/api/blogs')
            assert(response.body[0].hasOwnProperty('id'))
        })
    })

    // POST tests
    describe('POST tests', () => {
        test('succeeds with valid data', async () => {
            const newBlog = {
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

            const blog = blogsAtEnd.find(b => b.title === newBlog.title)
            assert.strictEqual(newBlog.author, blog.author)
            assert.strictEqual(newBlog.url, blog.url)
            assert.strictEqual(newBlog.likes, blog.likes)
        })

        test('succeeds with missing likes propery, which defaults to 0', async () => {
            const newBlog = {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

            const blog = blogsAtEnd.find(b => b.title === newBlog.title)
            assert.strictEqual(blog.likes, 0)
        })

        test('fails with status code 400 if title is missing', async () => {
            const newBlog = {
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
            }
            await api.post('/api/blogs').send(newBlog).expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })

        test('fails with status code 400 if url is missing', async () => {
            const newBlog = {
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                likes: 0,
            }
            await api.post('/api/blogs').send(newBlog).expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })
    })

    // DELETE tests
    describe('DELETE tests', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            const titles = blogsAtEnd.map(b => b.title)
            assert(!titles.includes(blogToDelete.title))

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        })
    })

    // PUT tests
    describe('PUT tests', () => {
        test('successfuly updates existing blog', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToChange = blogsAtStart[0]

            const newData = {
                likes: 13,
            }

            await api
                .put(`/api/blogs/${blogToChange.id}`)
                .send(newData)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

            const blogAfter = blogsAtEnd.find(b => b.id === blogToChange.id)
            assert.strictEqual(blogAfter.likes, 13)
            assert.strictEqual(blogAfter.title, blogToChange.title)
        })

        test("fails with status code 404 when trying to update non-existing blog", async () => {
            const blogsAtStart = await helper.blogsInDb()

            const newBlog = {
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 9
            }

            await api
                .put(`/api/blogs/5a422ba71b54a676234d17fb`)
                .send(newBlog)
                .expect(404)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })
    })

})


after(async () => {
    await mongoose.connection.close()
})
