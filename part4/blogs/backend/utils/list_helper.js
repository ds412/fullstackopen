const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogList.reduce(reducer, 0)
}

const favoriteBlog = (blogList) => {
    const reducer = (favorite, blog) => {
        return (blog.likes > favorite.likes) ? blog : favorite
    }
    return (blogList.length === 0) ? null : blogList.reduce(reducer, blogList[0])
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}
