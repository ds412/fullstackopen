import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [notification, setNotification] = useState('')
    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
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
            const user = await loginService.login({ username, password, })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification(`Welcome ${user.name}`)
            setTimeout(() => { setNotification(null) }, 5000)
        }
        catch (exception) {
            setNotification('Error: wrong username or password')
            setTimeout(() => { setNotification(null) }, 5000)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        setNotification('Succesfully logged out')
        setTimeout(() => { setNotification(null) }, 5000)
    }

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`Added ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => { setNotification(null) }, 5000)
    }

    const updateBlog = async (blogObject) => {
        const returnedBlog = await blogService.update(blogObject)
        setBlogs(blogs.map((b) => (b.id !== blogObject.id ? b : returnedBlog)))
        setNotification(`Liked ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => { setNotification(null) }, 5000)
    }

    const deleteBlog = async (blogObject) => {
        const confirmed = window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)
        if (confirmed) {
            try {
                await blogService.remove(blogObject)
                setBlogs(blogs.filter((b) => b.id !== blogObject.id))
                setNotification(`Removed ${blogObject.title} by ${blogObject.author}`)
                setTimeout(() => { setNotification(null) }, 5000)
            }
            catch (exception) {
                setNotification('Error: you do not have permission to remove this blog')
                setTimeout(() => { setNotification(null) }, 5000)
            }
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification message={notification}></Notification>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input type="text" value={username} name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input type="password" value={password} name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }
    else {
        return (
            <div>
                <h2>blogs</h2>
                <Notification message={notification}></Notification>
                <p>
                    {user.name} logged in
                    <button onClick={() => logout()}>logout</button>
                </p>
                <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} username={user.username} />
                </Togglable>
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog => (
                        <Blog key={blog.id} blog={blog}
                            update={updateBlog} remove={deleteBlog}
                            ownsBlog={user.username === blog.user.username}
                        />
                    ))
                }
            </div>
        )
    }
}

export default App
