import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'

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

    if (currUser === null) {
        return (
            <div>
                <Notification />
                <LoginForm />
            </div>
        )
    } else {
        return (
            <Container>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box>
                            <Button color="inherit" component={Link} to="/">
                                blogs
                            </Button>
                            <Button color="inherit" component={Link} to="/users">
                                users
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography>{currUser.name} logged in</Typography>
                            <Button
                                color="inherit"
                                onClick={() => logout()}
                                variant="outlined"
                                size="small">
                                logout
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 3, mb: 2 }}>
                    Blog App
                </Typography>
                <Notification />
                <Routes>
                    <Route path="/" element={<BlogList currUser={currUser} />} />
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User />} />
                </Routes>
            </Container>
        )
    }
}

export default App
