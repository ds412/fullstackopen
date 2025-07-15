import { useEffect } from 'react'
import {Routes, Route, Link,} from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'

import { useNotificationDispatch } from './NotificationContext'
import { useUserDispatch, useUserValue } from './UserContext'
import { setToken } from './requests'

const App = () => {
    const notificationDispatch = useNotificationDispatch()
    const userDispatch = useUserDispatch()
    const currUser = useUserValue()

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

    const navBar = {
        backgroundColor: 'lightgrey',
        padding: 5,
    }

    const padding = {
        margin: 5,
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
                <div style={navBar}>
                    <p>
                        <Link style={padding} to="/">
                            blogs
                        </Link>
                        <Link style={padding} to="/users">
                            users
                        </Link>
                        <span>{currUser.name} logged in </span>
                        <button style={{ padding }} onClick={() => logout()}>
                            logout
                        </button>
                    </p>
                </div>
                <h1>Blog App</h1>
                <Notification />
                <Routes>
                    <Route path="/" element={<BlogList currUser={currUser} />} />
                    <Route path="/blogs/:id" element={<Blog/>} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User />} />
                </Routes>
            </div>
        )
    }
}

export default App
