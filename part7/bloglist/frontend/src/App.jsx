import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
    const notificationDispatch = useNotificationDispatch()
    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            notificationDispatch(`Welcome ${user.name}`)
        } catch (exception) {
            notificationDispatch('Error: wrong username or password')
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        notificationDispatch('Succesfully logged out')
    }

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        try {
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnedBlog))
            notificationDispatch(`Added ${returnedBlog.title} by ${returnedBlog.author}`)
        }
        catch (exception) {
            notificationDispatch('Error: failed to add blog')
        }
    }

    const updateBlog = async (blogObject) => {
        const returnedBlog = await blogService.update(blogObject)
        setBlogs(blogs.map((b) => (b.id !== blogObject.id ? b : returnedBlog)))
        notificationDispatch(`Liked ${returnedBlog.title} by ${returnedBlog.author}`)
    }

    const deleteBlog = async (blogObject) => {
        const confirmed = window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)
        if (confirmed) {
            try {
                await blogService.remove(blogObject)
                setBlogs(blogs.filter((b) => b.id !== blogObject.id))
                notificationDispatch(`Removed ${blogObject.title} by ${blogObject.author}`)
            } catch (exception) {
                notificationDispatch('Error: you do not have permission to remove this blog')
            }
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification />
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <Notification />
                <p>
                    {user.name} logged in
                    <button onClick={() => logout()}>logout</button>
                </p>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} username={user.username} />
                </Togglable>
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            update={updateBlog}
                            remove={deleteBlog}
                            ownsBlog={user.username === blog.user.username}
                        />
                    ))}
            </div>
        )
    }
}

export default App
