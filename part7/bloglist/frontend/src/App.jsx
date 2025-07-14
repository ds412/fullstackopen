import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import { setToken, getBlogs, createBlog, updateBlog, removeBlog } from './requests'

import { useNotificationDispatch } from './NotificationContext'
import { useUserDispatch, useUserValue } from './UserContext'

const App = () => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()
    const userDispatch = useUserDispatch()
    const currUser = useUserValue()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const blogFormRef = useRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userDispatch({type: 'LOGIN', payload: user})
            setToken(user.token)
        }
    }, [userDispatch])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            setToken(user.token)
            userDispatch({type: 'LOGIN', payload: user})
            setUsername('')
            setPassword('')
            notificationDispatch(`Welcome ${user.name}`)
        } catch (exception) {
            notificationDispatch('Error: wrong username or password')
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        userDispatch({ type: 'LOGOUT' })
        notificationDispatch('Succesfully logged out')
    }

    const addBlogMutation = useMutation({
        mutationFn: createBlog,
        onSuccess: (returnedBlog) => {
            queryClient.invalidateQueries('blogs')
            notificationDispatch(`Added ${returnedBlog.title} by ${returnedBlog.author}`)
        },
        onError: () => {
            notificationDispatch('Error: failed to add blog')
        },
    })

    const updateBlogMutation = useMutation({
        mutationFn: updateBlog,
        onSuccess: (updatedBlog) => {
            queryClient.invalidateQueries('blogs')
            notificationDispatch(`Liked ${updatedBlog.title} by ${updatedBlog.author}`)
        },
    })

    const deleteBlogMutation = useMutation({
        mutationFn: removeBlog,
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        },
        onError: () => {
            notificationDispatch('Error: you do not have permission to remove this blog')
        },
    })

    const handleAddBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        addBlogMutation.mutate(blogObject)
    }

    const handleUpdateBlog = async (blog) => {
        updateBlogMutation.mutate({ ...blog })
        notificationDispatch(`Liked ${blog.title} by ${blog.author}`)
    }

    const handleDeleteBlog = async (blogObject) => {
        const confirmed = window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)
        if (confirmed) {
            deleteBlogMutation.mutate(blogObject)
            notificationDispatch(`Removed ${blogObject.title} by ${blogObject.author}`)
        }
    }

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
        retry: 1,
        refetchInterval: 300000,
        refetchOnWindowFocus: false
    })
    if (result.isLoading) {
        return <div>loading data...</div>
    }
    if (result.isError) {
        return <div>Blog service not available due to problems in the server</div>
    }
    const blogs = result.data

    if (currUser === null) {
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
                    {currUser.name} logged in
                    <button onClick={() => logout()}>logout</button>
                </p>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={handleAddBlog} username={currUser.username} />
                </Togglable>
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            update={handleUpdateBlog}
                            remove={handleDeleteBlog}
                            ownsBlog={currUser.username === blog.user.username}
                        />
                    ))}
            </div>
        )
    }
}

export default App
