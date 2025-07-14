import { useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
// import {
//     BrowserRouter as Router, // renamed BrowserRouter
//     Routes,
//     Route,
//     Link,
//     Navigate,
//     useParams, // allows using parameterized URLs
//     useNavigate, // allows changing URL bar inside Routes
//     useMatch, // allows component to know a state matching its url
// } from 'react-router-dom'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'

import { useNotificationDispatch } from './NotificationContext'
import { useUserDispatch, useUserValue } from './UserContext'
import { setToken } from './requests'
import useBlogMutations from './useBlogMutations'

const App = () => {
    const notificationDispatch = useNotificationDispatch()
    const userDispatch = useUserDispatch()
    const currUser = useUserValue()
    const blogFormRef = useRef()
    const {handleAddBlog, handleUpdateBlog, handleDeleteBlog} = useBlogMutations(blogFormRef)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userDispatch({ type: 'LOGIN', payload: user })
            setToken(user.token)
        }
    }, [userDispatch])

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        userDispatch({ type: 'LOGOUT' })
        notificationDispatch('Succesfully logged out')
    }

    if (currUser === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification />
                <LoginForm />
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
                <BlogList
                    currUser={currUser}
                    handleUpdateBlog={handleUpdateBlog}
                    handleDeleteBlog={handleDeleteBlog}
                />
                <Users/>
            </div>
        )
    }
}

export default App
