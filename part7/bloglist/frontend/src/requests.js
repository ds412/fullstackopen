import axios from 'axios'
const blogsUrl = '/api/blogs'
const usersUrl = '/api/users'

let token = null

export const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

export const getBlogs = async () => {
    const response = await axios.get(blogsUrl)
    return response.data
}

export const createBlog = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(blogsUrl, newBlog, config)
    return response.data
}

export const updateBlog = async (updatedBlog) => {
    const response = await axios.put(`${blogsUrl}/${updatedBlog.id}`, updatedBlog)
    return response.data
}

export const removeBlog = async (blogToDelete) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${blogsUrl}/${blogToDelete.id}`, config)
    return response.data
}

export const getUsers = async () => {
    const response = await axios.get(usersUrl)
    return response.data
}
