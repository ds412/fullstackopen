// module defining the REST routes (minimal: currently just GET and POST)
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')                 // Mongoose schema

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
