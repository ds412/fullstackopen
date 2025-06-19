import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [notification, setNotification] = useState('')
    const [blogs, setBlogs] = useState([])

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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
            setNotification('Wrong username or password')
            setTimeout(() => { setNotification(null) }, 5000)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        setNotification('Succesfully logged out')
        setTimeout(() => { setNotification(null) }, 5000)
    }


    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url,
            user: user.username,
            likes: 0
        }

        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setNotification(`Added ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => { setNotification(null) }, 5000)
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
                <h2>create new</h2>
                <form onSubmit={addBlog}>
                    <div>
                        title
                        <input type="text" value={title} name="Title"
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author
                        <input type="text" value={author} name="Author"
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url
                        <input type="text" value={url} name="Url"
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
        )
    }
}

export default App
