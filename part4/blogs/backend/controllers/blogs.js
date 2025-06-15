// module defining the REST routes
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')                 // Mongoose schema
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    // const users = await User.find({})
    // const user = users[Math.floor(Math.random() * users.length)]

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(400).json({ error: 'UserId missing or not valid' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes | 0,
        user: user
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).end()
    }

    if (title) blog.title = title
    if (author) blog.author = author
    if (url) blog.url = url
    if (likes) blog.likes = likes

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
})

module.exports = blogsRouter
